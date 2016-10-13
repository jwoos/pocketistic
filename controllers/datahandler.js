'use strict';

const db = require('./models/index');
const proxy = require('./proxy');

let lock = {};

function update(username, response) {
	// TODO check for updated day
	// allow one update a day
	if (lock[username]) {
		return;
	}

	let data = response.json;
	let parsedData = [];
	const unusedFields [
		'favorite',
		'time_updated',
		'time_favorited',
		'sort_id',
		'is_article',
		'is_index',
		'has_video',
		'has_image'
	];

	for (let id in data) {
		let article = data[id];

		unusedFields.forEach((elem) => {
			delete article[elem];
		});

		article.time_added = new Date(article.time_added * 1000);
		article.time_read = new Date(article.time_read * 1000);

		parsedData.push(parsedData);
	}

	db.Article.bulkCreate(parsedData).then(() => {
		delete lock[username];
	}).catch(() => {});
}

function retrieve() {}

module.exports = {
	update: update
};
