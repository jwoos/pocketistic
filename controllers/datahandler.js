'use strict';

const fs = require('fs');
const stream = require('stream');

const debug = require('debug')('pocketistic:datahandler');
const md5 = require('blueimp-md5');
const request = require('request');

const data = require('../data');
const db = require('../models/index');

let lock = {};

function update(username, response) {
	if (lock[username]) {
		debug(`lock: ${username}`);
		return;
	}

	let user;

	db.User.findOne({
		where: {
			username: username
		}
	}).then((userInstance) => {
		user = userInstance;

		let path = `./user_data/${user.hash}/`;

		try {
			fs.mkdirSync(path);
		} catch (e) {
			debug(e);
		}

		return db.Article.findOrCreate({
			where: {
				user_username: username
			},
			defaults: {
				path: path
			}
		});
	}).spread((articleInstance, created) => {
		user.set('last_update', new Date());
		user.save();

		let readable = new stream.Readable({
			encoding: 'utf8',
			read: () => {}
		});
		readable.push(response);

		let writable = fs.createWriteStream(`./user_data/${user.hash}/data.json`);

		readable.pipe(writable);
		writable.end();
	}).catch(() => {
		debug('Failed updating');
	});
}

function retrieve(username) {
	let hash = md5(username);
	let data = JSON.parse(fs.readFileSync(`./user_data/${hash}/data.json`));

	return data;
}

function proxyRetrieve(accessToken, fn) {
	/*
	 * state         string       unread/archive/all
	 * favorite      0 or 1       0/1
	 * tag           string       <TAG_NAME>/_untagged_
	 * contentType   string       article/vidoe/image
	 * sort          string       newest/oldest/title/site
	 * detailType    string       simple/complete
	 * search        string       Only return items whose title or url contain the search string
	 * domain        string       Only return items from a particular domain
	 * since         timestamp    Only return items modified since the given since unix timestamp
	 * count         integer      Only return count number of items
	 * offset        integer      Used only with count; start returning from offset position of results
	 */
	let response = {};

	let getData = {
		access_token: accessToken,
		consumer_key: data.consumerKey,
		state: 'all'
	};

	let options = {
		url: `${data.apiBase}/get`,
		method: 'POST',
		headers: {
			'Content-Type': 'application/json; charset=UTF-8',
			'X-Accept': 'application/json',
		},
		body: JSON.stringify(getData)
	};

	request(options, (err, res, body) => {
		if (err) {
			debug(err);
			response.error = err;
		} else {
			response.statusCode = res.statusCode;

			if (res.statusCode === 200) {
				let respJson = JSON.parse(body);
				response.json = respJson;
			} else {
				debug(res.headers);
				response.statusError = body;
			}
		}

		fn(response);
	});
}

module.exports = {
	proxyRetrieve: proxyRetrieve,
	retrieve: retrieve,
	update: update
};
