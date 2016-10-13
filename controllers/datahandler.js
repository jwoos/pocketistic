'use strict';

const db = require('../models/index');
const proxy = require('./proxy');

let lock = {};

// TODO delete article model
// add data model with userid, username, path of json file
// save file to json in /user_data and insert path into db
function update(username, response) {
	if (lock[username]) {
		return;
	}

	let data = response.json;
	let parsedData = [];
	const unusedFields = [
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
