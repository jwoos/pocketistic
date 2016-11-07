'use strict';

function getDomain(link) {
	const re = /^(?:https?:\/\/)?(?:[^@\/\n]+@)?(?:www\.)?([^:\/\n]+)/;
	let matches = link.match(re);

	return matches[1];
}

function count(data) {
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
	let rcolor = new RColor();

	let chartData = {
		labels: Object.keys(data),
		datasets: [
			{
				backgroundColor: Array(Object.keys(data).length).fill(0).map(() => {
					let arr = rcolor.get();
					return `rgba(${arr[0]}, ${arr[1]}, ${arr[2]}, 0.4)`;
				}),
				borderWidth: 1,
				data: Object.values(data).map((str) => {
					return Number.parseInt(str);
				})
			}
		]
	};

	let ctx = document.getElementById('domain-graph');
	let chart = new Chart(ctx, {
		type: 'bar',
		data: chartData
	});
}

function composeCountGraph(data) {
	let rcolor = new RColor();

	let chartData = {
		labels: ['unread', 'read'],
		datasets: [
			{
				label: 'article count',
				data: [data.unread, data.read],
				borderWidth: 1,
				backgroundColor: Array(2).fill(0).map(() => {
					let arr = rcolor.get();
					return `rgba(${arr[0]}, ${arr[1]}, ${arr[2]}, 0.4)`;
				})
			}
		]
	};

	let ctx = document.getElementById('count-graph');
	let chart = new Chart(ctx, {
		type: 'pie',
		data: chartData
	});
}

function composeWordCountGraph(data) {
	let rcolor = new RColor();

	let chartData = {
		labels: ['unread', 'read'],
		datasets: [
			{
				label: 'word count',
				data: [data.unreadWords, data.readWords],
				borderWidth: 1,
				backgroundColor: Array(2).fill(0).map(() => {
					let arr = rcolor.get();
					return `rgba(${arr[0]}, ${arr[1]}, ${arr[2]}, 0.4)`;
				})
			}
		]
	};

	let ctx = document.getElementById('word-graph');
	let chart = new Chart(ctx, {
		type: 'pie',
		data: chartData
	});
}

$(document).ready(function() {
	let data = {};

	let bound = rivets.bind($('body#home .col-md-12.main'), {
		data: data
	});

	$.get('/data/').done(function(response, textStatus, jqXHR) {
		if (!response.parsed) {
			data.count = count(response.data);
			composeCountGraph(data.count);
			composeWordCountGraph(data.count);
			composeDomainGraph(data.count.domains);

			$.ajax({
				type: 'POST',
				url: '/data/parsed/update',
				data: JSON.stringify(data),
				success: () => {},
				dataType: 'json',
				contentType: 'application/json'
			});
		} else {
			data.count = response.data.count;
			composeCountGraph(data.count);
			composeWordCountGraph(data.count);
			composeDomainGraph(data.count.domains);
		}
	}).fail(function(jqXHR, textStatus, errorThrown) {
		swal({
			title: 'Oops',
			type: 'error',
			text: `${jqXHR.status}: ${errorThrown}\n${jqXHR.responseText}`
		});
	});

	$('#update').on('click', () => {
		$.get('/data/raw/update').done(function(response, textStatus, jqXHR) {
			bound.unbind();

			data = {};

			bound = rivets.bind($('body#home .col-md-12.main'), {
				data: data
			});

			data.count = count(response);
			composeCountGraph(data.count);
			composeDomainGraph(data.count.domains);
		}).fail(function(jqXHR, textStatus, errorThrown) {
			swal({
				title: 'Oops',
				type: 'error',
				text: `${jqXHR.status}: ${errorThrown}\n${jqXHR.responseText}`
			});
		});
	});
});
