'use strict';

const fs = require('fs');
const stream = require('stream');

const md5 = require('blueimp-md5');

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

	let hash = md5(username);

	// TODO create directory if it does not exist
	// get versionNum and create or update db entry
	let readable = new stream.Readable({
		encoding: 'utf8',
		read: () => {}
	});
	readable.push(response.json);

	let writable = fs.createWriteStream(`./user_data/${username}/version-${versionNum}`);

	readable.pipe(writable);
	writable.end();
}

function retrieve() {}

module.exports = {
	update: update
};
