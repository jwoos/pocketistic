'use strict';

const fs = require('fs');
const stream = require('stream');

const bluebird = require('bluebird');
const debug = require('debug')('pocketistic:datahandler');
const md5 = require('blueimp-md5');
const request = require('request');

const data = require('../data');
const db = require('../models/index');

let lock = {
	raw: {},
	parsed: {}
};

function retrieveLocal(username) {
	return db.User.findOne({
		where: {
			username: username
		}
	}).then((user) => {
		let basePath = `./user_data/${user.hash}`;

		return new bluebird((resolve, reject) => {
			fs.readFile(`${basePath}/parsed.json`, 'utf8', (err, data) => {
				if (!err) {
					debug('retrieved local parsed data');

					resolve({
						updated: false,
						user: user,
						parsed: true,
						data: JSON.parse(data),
						error: null
					});

					return;
				}

				fs.readFile(`${basePath}/raw.json`, 'utf8', (err, data) => {
					if (!err) {
						debug('retrieved local raw data');

						resolve({
							updated: false,
							user: user,
							parsed: false,
							data: JSON.parse(data),
							error: null
						});

						return;
					}

					reject({
						error: 'Unabled to read files',
						user: user
					});
				});
			});
		});
	}, () => {
		debug('user not found');

		return bluebird.reject({
			error: 'USER_NOT_FOUND'
		});
	});
}

function retrieveProxy(username) {
	return db.User.findOne({
		where: {
			username: username
		}
	}).then((user) => {
		if (!(user.raw_update < new Date(Date.now() - 2 * 1000 * 60 * 60 * 24))) {
			debug('can only update when older than two days');

			return bluebird.reject({
				error: 'Can only update once every two days'
			});
		}

		let options = {
			url: `${data.apiBase}/get`,
			method: 'POST',
			headers: {
				'Content-Type': 'application/json; charset=UTF-8',
				'X-Accept': 'application/json',
			},
			body: JSON.stringify({
				access_token: user.access_token,
				consumer_key: data.consumerKey,
				state: 'all'
			})
		};

		return new bluebird((resolve, reject) => {
			request(options, (err, res, body) => {
				if (err) {
					debug(err);

					return reject();
				}

				if (res.statusCode === 200) {
					debug(body);
					resolve({
						updated: true,
						user: user,
						parsed: false,
						data: JSON.parse(body).list,
						error: null
					});
				} else {
					debug(res.headers);
					resolve({
						error: body
					});
				}
			});
		});
	});
}

function saveRaw(user, data) {
	if (lock.raw[user.username]) {
		debug(`lock: ${user.username}`);
		return;
	}

	let path = `./user_data/${user.hash}`;

	try {
		fs.mkdirSync(path);
	} catch (e) {
		debug(e);
	}

	user.set('raw_update', new Date());
	user.save();

	return new bluebird((resolve, reject) => {
		fs.writeFile(`${path}/raw.json`, JSON.stringify(data), 'utf8', (err) => {
			if (err) {
				reject();
			} else {
				resolve();
			}
		});
	});
}

function saveParsed(username, data) {
	if (lock.parsed[username]) {
		debug(`lock: ${username}`);
		return;
	}

	return db.User.findOne({
		where: {
			username: username
		}
	}).then((user) => {
		let path = `./user_data/${user.hash}`;

		try {
			fs.mkdirSync(path);
		} catch (e) {
			debug(e);
		}

		user.set('parsed_update', new Date());
		user.save();

		return new bluebird((resolve, reject) => {
			fs.writeFile(`${path}/parsed.json`, JSON.stringify(data), 'utf8', (err) => {
				if (err) {
					reject();
				} else {
					resolve();
				}
			});
		});
	});

}

module.exports = {
	saveParsed: saveParsed,
	saveRaw: saveRaw,
	retrieveLocal: retrieveLocal,
	retrieveProxy: retrieveProxy
};
