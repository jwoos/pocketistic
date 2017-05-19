'use strict';

const composeDomainGraph = (data) => {
	const rcolor = new RColor();

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
	new Chart(ctx, {
		type: 'bar',
		data: chartData
	});
}

const composeCountGraph = (data) => {
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
	new Chart(ctx, {
		type: 'pie',
		data: chartData
	});
};

const composeWordCountGraph = (data) => {
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
	new Chart(ctx, {
		type: 'pie',
		data: chartData
	});
};

let data;

axios.get('/api/data/').then((response) => {
	data = response.data.data;

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
