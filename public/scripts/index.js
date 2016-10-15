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
		wordCount += wc? Number.parseInt(article.word_count, 10) : 0;

		if (article.time_read != '0') {
			read++;
		} else {
			unread++;
		}

		total++;
	}

	let averageWordCount = wordCount/ keys.length;

	return {
		total: total,
		read: read,
		unread: unread,
		wordCount: wordCount,
		averageWordCount: averageWordCount,
		domains: domains
	};
}

function composeGraph(data) {
	let rcolor = new RColor();

	let chartData = {
		labels: Object.keys(data),
		datasets: [
			{
				label: 'domains',
				backgroundColor: Array(Object.keys(data).length).fill(0).map(() => {
					let arr = rcolor.get();
					console.log(arr);
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

$(document).ready(function() {
	let data = {};

	let bound = rivets.bind($('body#home .col-md-12.main'), {
		data: data
	});

	$.get('/data/retrieve').done(function(response, textStatus, jqXHR) {
		data.count = count(response);
		composeGraph(data.count.domains);
	}).fail(function(jqXHR, textStatus, errorThrown) {
		swal({
			title: 'Oops',
			type: 'error',
			text: `${jqXHR.status}: ${errorThrown}\n${jqXHR.responseText}`
		});
	});

	$('#update').on('click', () => {
		$.get('/data/update').done(function(response, textStatus, jqXHR) {
			bound.unbind();

			data = {};

			bound = rivets.bind($('body#home .col-md-12.main'), {
				data: data
			});
		}).fail(function(jqXHR, textStatus, errorThrown) {
			swal({
				title: 'Oops',
				type: 'error',
				text: `${jqXHR.status}: ${errorThrown}\n${jqXHR.responseText}`
			});
		});
	});
});
