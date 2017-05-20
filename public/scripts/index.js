'use strict';

const generateColor = () => {
	const col = rcolor().slice(1);
	return `rgba(${parseInt(col.slice(0, 2), 16)}, ${parseInt(col.slice(2, 4), 16)}, ${parseInt(col.slice(4), 16)}, 0.4)`;
};

const bindView = (selector, data) => {
	return rivets.bind(document.querySelector(selector), data);
};

const composeDomainGraph = (data) => {
	const chartData = {
		labels: Object.keys(data),
		datasets: [
			{
				backgroundColor: Array(Object.keys(data).length).fill(0).map(generateColor),
				borderWidth: 1,
				data: Object.values(data).map((str) => {
					return Number.parseInt(str);
				})
			}
		]
	};

	const ctx = document.getElementById('domain-graph');
	new Chart(ctx, {
		type: 'bar',
		data: chartData
	});
}

const composeCountGraph = (data) => {
	const chartData = {
		labels: ['unread', 'read'],
		datasets: [
			{
				label: 'article count',
				data: [data.unread ? data.unread : data.unread_articles, data.read ? data.read : data.read_articles],
				borderWidth: 1,
				backgroundColor: Array(2).fill(0).map(generateColor)
			}
		]
	};

	const ctx = document.getElementById('count-graph');
	new Chart(ctx, {
		type: 'pie',
		data: chartData
	});
};

const composeWordCountGraph = (data) => {
	const chartData = {
		labels: ['unread', 'read'],
		datasets: [
			{
				label: 'word count',
				data: [data.unreadWords ? data.unreadWords : data.unread_words, data.readWords ? data.readWords : data.read_words],
				borderWidth: 1,
				backgroundColor: Array(2).fill(0).map(generateColor)
			}
		]
	};

	const ctx = document.getElementById('word-graph');
	new Chart(ctx, {
		type: 'pie',
		data: chartData
	});
};

let data;

axios.get('/api/data/').then((response) => {
	data = response.data.data;

	const articleCountView = bindView('#article-count', {
		total: data.read_articles + data.unread_articles,
		read: data.read_articles,
		unread: data.unread_articles
	});

	const wordCountView = bindView('#word-count', {
		total: data.read_words + data.unread_words,
		read_average: data.read_words / data.read_articles,
		unread_average: data.unread_articles / data.unread_articles,
		read: data.read_words,
		unread: data.unread_words
	});

	composeCountGraph(data);
	composeWordCountGraph(data);
	composeDomainGraph(data.domains);
}).catch((error) => {
	swal({
		title: 'Oops',
		type: 'error',
		text: `${error.response.status}: ${error.response.data}`
	});
});

document.querySelector('#update').addEventListener('click', () => {
	axios.get('/api/data/raw/update').then((response) => {
		data = compute(response.data);

		composeCountGraph(data);
		composeWordCountGraph(data);
		composeDomainGraph(data.domains);
	}).catch((error) => {
		swal({
			title: 'Oops',
			type: 'error',
			text: `${error.response.status}: ${error.response.data}`
		});
	});
});
