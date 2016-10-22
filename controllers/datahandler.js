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

		let path = `./user_data/${user.hash}`;

		try {
			fs.mkdirSync(path);
		} catch (e) {
			debug(e);
		}

		user.set('last_update', new Date());
		user.save();

		return fs.writeFile(`${path}/data.json`, JSON.stringify(response.list));
	}).catch(() => {
		debug('Failed updating');
	});
}

function retrieve(username) {
	let hash = md5(username);
	let data;

	try {
		debug('retrieving parsed');
		data = JSON.parse(fs.readFileSync(`./user_data/${hash}/parsed.json`));
	} catch (e) {
		debug('retrieving raw');
		data = JSON.parse(fs.readFileSync(`./user_data/${hash}/data.json`));
	}

	return data;
}

function proxyRetrieve(accessToken, fn) {
	db.User.findOne({
		where: {
			access_token: accessToken
		}
	}).then((user) => {
		if (!(user.last_update < new Date(Date.now() - 2 * 1000 * 60 * 60 * 24))) {
			fn({
				statusCode: 403,
				statusError: `You last updated: ${user.last_update}, updates are allowed once every two days currently`
			});
			return;
		}

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

	});
}

function saveParsed(username, data, fn) {
	db.User.findOne({
		where: {
			username: username
		}
	}).then((userInstance) => {
		let user = userInstance;

		let path = `./user_data/${user.hash}`;

		fs.writeFile(`${path}/parsed.json`, JSON.stringify(data));

		fn(true);
	}).catch(() => {
		fn(false);
		debug('Failed updating');
	});
}

module.exports = {
	proxyRetrieve: proxyRetrieve,
	retrieve: retrieve,
	update: update,
	saveParsed: saveParsed
};
