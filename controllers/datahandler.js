'use strict';

const fs = require('fs');

const bluebird = require('bluebird');
const debug = require('debug')('pocketistic:controller-datahandler');
const request = require('request');

const config = require('../config');
const db = require('../models/index');
const utils = require('../utils/utils');

const lock = {
	raw: {},
	parsed: {}
};

const getUserByUsername = (username) => {
	return db.User.findOne({
		where: {
			username: username
		}
	});
};

const retrieveLocalRaw = (user) => {
	const filePath = `./user_data/${user.hash}.json`;
	const resolution = {
		parsed: false,
		user: user.toJSON(),
		data: null,
		error: null,
		updated: user.raw_update
	};

	return new bluebird((resolve, reject) => {
		fs.readFile(filePath, 'utf8', (err, data) => {
			if (err) {
				resolution.error = err;

				reject(resolution);
			} else {
				resolution.data = JSON.parse(data);

				resolve(resolution);
			}

		});
	});
};

const retrieveLocalParsed = (user) => {
	const resolution = {
		parsed: true,
		user: user.toJSON(),
		data: null,
		error: null,
		updated: user.parsed_update
	};

	return db.Stat.findOne({
		where: {
			username: user.username
		}
	}).then((stat) => {
		resolution.data = stat.toJSON();

		return resolution;
	}, (err) => {
		resolution.error = err;

		return bluebird.reject(resolution);
	});
};

const retrieveProxy = (user) => {
	const resolution = {
		parsed: false,
		user: user.toJSON(),
		data: null,
		error: null,
		updated: user.raw_update
	};

	const options = {
		url: `${config.apiBase}/get`,
		method: 'POST',
		headers: {
			'Content-Type': 'application/json; charset=UTF-8',
			'X-Accept': 'application/json',
		},
		body: JSON.stringify({
			access_token: user.access_token,
			consumer_key: config.consumerKey,
			state: 'all'
		})
	};

	return new bluebird((resolve, reject) => {
		request(options, (err, res, body) => {
			if (err) {
				resolution.error = err;
				return reject(resolution);
			}

			if (res.statusCode === 200) {
				resolution.data = JSON.parse(body).list;

				resolve(resolution);
			} else {
				resolution.error = body;

				reject(resolution);
			}
		});
	});
};

const saveRaw = (user, data) => {
	if (lock.raw[user.username]) {
		return bluebird.resolve();
	}

	const filePath = `./user_data/${user.hash}.json`;

	return new bluebird((resolve, reject) => {
		fs.writeFile(filePath, JSON.stringify(data), 'utf8', (err) => {
			if (err) {
				reject(err);
			} else {
				resolve();
			}
		});
	}).then(() => {
		user.set('raw_update', new Date());
		return user.save();
	});
};

const saveParsed = (user, data) => {
	if (lock.parsed[user.username]) {
		return bluebird.resolve();
	}

	return db.Stat.findOrCreate({
		where: {
			username: user.username
		}
	}).spread((stat) => {
		stat.set('unread_words', data.unreadWords);
		stat.set('read_words', data.readWords);
		stat.set('read_articles', data.read);
		stat.set('unread_articles', data.unread);
		stat.set('domains', data.domains);

		user.set('parsed_update', new Date());

		return bluebird.all([
			stat.save(),
			user.save()
		]);
	});
};

const parse = (data) => {
	const keys = Object.keys(data);

	let total = 0;
	let unread = 0;
	let read = 0;
	let wordCount = 0;
	let unreadWords = 0;
	let readWords = 0;
	let domains = {};

	for (let i = 0; i < keys.length; i++) {
		const article = data[keys[i]];

		if (!article.resolved_url) {
			delete data[keys[i]];
			continue;
		}

		const domain = utils.getDomain(article.resolved_url);

		if (domains[domain]) {
			domains[domain]++;
		} else {
			domains[domain] = 1;
		}

		const wc = article.word_count;
		wordCount += wc ? parseInt(article.word_count, 10) : 0;

		if (article.time_read != '0') {
			read++;
			readWords += parseInt(article.word_count);
		} else {
			unread++;
			unreadWords += parseInt(article.word_count);
		}

		total++;
	}

	const averageWordCount = wordCount / keys.length;

	return {
		total,
		read,
		unread,
		wordCount,
		averageWordCount,
		domains,
		readWords,
		unreadWords
	};
};

const update = (user) => {
	debug('updating data');
	retrieveProxy(user).then((resolution) => {
		const data = resolution.data;
		const parsed = parse(data);

		return bluebird.all([
			saveRaw(user, data),
			saveParsed(user, parsed)
		]);
	});
};

const retrieve = (username, shouldUpdate) => {
	const resolution = {
		parsed: null,
		user: null,
		data: null,
		updated: null
	};

	let user;

	return getUserByUsername(username).then((u) => {
		user = u;
		resolution.user = user.toJSON();

		let promise = bluebird.resolve();

		if (shouldUpdate || (user.raw_update <= new Date(Date.now() - 2 * 1000 * 60 * 60 * 24))) {
			promise = update(user);
		}

		return promise.then(() => {
			return retrieveLocalParsed(user);
		});
	});
};

module.exports = {
	retrieveProxy,
	retrieveLocalRaw,
	retrieveLocalParsed,
	retrieve
};
