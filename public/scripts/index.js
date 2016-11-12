'use strict';

function getDomain(link) {
	const re = /^(?:https?:\/\/)?(?:[^@\/\n]+@)?(?:www\.)?([^:\/\n]+)/;
	let matches = link.match(re);

	return matches[1];
}

function compute(data) {
	let keys = Object.keys(data);

	let total = 0;
	let unread = 0;
	let read = 0;
	let wordCount = 0;
	let unreadWords = 0;
	let readWords = 0;
	let domains = {};

	for (let i = 0; i < keys.length; i++) {
		let article = data[keys[i]];

		if (!article.resolved_url) {
			delete data[keys[i]];
			continue;
		}

		let domain = getDomain(article.resolved_url);

		if (domains[domain]) {
			domains[domain]++;
		} else {
			domains[domain] = 1;
		}

		let wc = article.word_count;
		wordCount += wc? parseInt(article.word_count, 10) : 0;

		if (article.time_read != '0') {
			read++;
			readWords += parseInt(article.word_count);
		} else {
			unread++;
			unreadWords += parseInt(article.word_count);
		}

		total++;
	}

	let averageWordCount = wordCount / keys.length;

	return {
		total: total,
		read: read,
		unread: unread,
		wordCount: wordCount,
		averageWordCount: averageWordCount,
		domains: domains,
		readWords: readWords,
		unreadWords: unreadWords
	};
}

function composeDomainGraph(data) {
	const rcolor = new RColor();

	console.log(data);

	const chartData = {
		labels: Object.keys(data),
		datasets: [
			{
				backgroundColor: Array(Object.keys(data).length).fill(0).map(() => {
					const arr = rcolor.get();
					return `rgba(${arr[0]}, ${arr[1]}, ${arr[2]}, 0.4)`;
				}),
				borderWidth: 1,
				data: Object.values(data).map((str) => {
					return Number.parseInt(str);
				})
			}
		]
	};

	const ctx = document.getElementById('domain-graph');
	const chart = new Chart(ctx, {
		type: 'bar',
		data: chartData
	});
}

function composeCountGraph(data) {
	const rcolor = new RColor();

	const chartData = {
		labels: ['unread', 'read'],
		datasets: [
			{
				label: 'article count',
				data: [data.unread ? data.unread : data.unread_articles, data.read ? data.read : data.read_articles],
				borderWidth: 1,
				backgroundColor: Array(2).fill(0).map(() => {
					const arr = rcolor.get();
					return `rgba(${arr[0]}, ${arr[1]}, ${arr[2]}, 0.4)`;
				})
			}
		]
	};

	const ctx = document.getElementById('count-graph');
	const chart = new Chart(ctx, {
		type: 'pie',
		data: chartData
	});
}

function composeWordCountGraph(data) {
	const rcolor = new RColor();

	const chartData = {
		labels: ['unread', 'read'],
		datasets: [
			{
				label: 'word count',
				data: [data.unreadWords ? data.unreadWords : data.unread_words, data.readWords ? data.readWords : data.read_words],
				borderWidth: 1,
				backgroundColor: Array(2).fill(0).map(() => {
					const arr = rcolor.get();
					return `rgba(${arr[0]}, ${arr[1]}, ${arr[2]}, 0.4)`;
				})
			}
		]
	};

	const ctx = document.getElementById('word-graph');
	const chart = new Chart(ctx, {
		type: 'pie',
		data: chartData
	});
}

let data;

$.get('/data/').done(function(response, textStatus, jqXHR) {
	if (!response.parsed) {
		data = compute(response.data);
		$.ajax({
			type: 'POST',
			url: '/data/parsed/update',
			data: JSON.stringify(data),
			success: () => {},
			dataType: 'json',
			contentType: 'application/json'
		});
	} else {
		data = response.data;
	}

	composeCountGraph(data);
	composeWordCountGraph(data);
	composeDomainGraph(data.domains);

}).fail(function(jqXHR, textStatus, errorThrown) {
	swal({
		title: 'Oops',
		type: 'error',
		text: `${jqXHR.status}: ${errorThrown}\n${jqXHR.responseText}`
	});
});

$('#update').on('click', () => {
	$.get('/data/raw/update').done(function(response, textStatus, jqXHR) {
		data = compute(response);

		composeCountGraph(data);
		composeWordCountGraph(data);
		composeDomainGraph(data.domains);
	}).fail(function(jqXHR, textStatus, errorThrown) {
		swal({
			title: 'Oops',
			type: 'error',
			text: `${jqXHR.status}: ${errorThrown}\n${jqXHR.responseText}`
		});
	});
});
