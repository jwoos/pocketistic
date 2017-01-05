'use strict';

const md5 = require('blueimp-md5');
const request = require('request');

const config = require('../config');
const db = require('../models/index');

const retrieveRequestToken = () => {
	const postData = {
		consumer_key: config.consumerKey,
		redirect_uri: `${config.url}/login?end=true`,
		state: ''
	};

	const options = {
		url: `${config.apiBase}${config.apiRequest}`,
		method: 'POST',
		headers: {
			'Content-Type': 'application/json; charset=UTF-8',
			'X-Accept': 'application/json',
		},
		body: JSON.stringify(postData)
	};

	return new Promise((resolve, reject) => {
		request(options, (err, res, body) => {
			if (err) {
				reject(err);
			} else {
				body = JSON.parse(body);
				const statusIsOkay = res.statusCode === 200;

				const resolution = {
					statusCode: res.statusCode,
					redirect: statusIsOkay ? `${config.apiRedirect}?request_token=${body.code}&redirect_uri=${postData.redirect_uri}` : null,
					statusError: statusIsOkay ? null : body,
					requestToken: statusIsOkay ? body.code : null
				};

				resolve(resolution);
			}
		});
	});
};

const retrieveAccessToken = (requestToken) => {
	const postData = {
		consumer_key: config.consumerKey,
		code: requestToken
	};

	const options = {
		url: `${config.apiBase}${config.apiAccess}`,
		method: 'POST',
		headers: {
			'Content-Type': 'application/json; charset=UTF-8',
			'X-Accept': 'application/json',
		},
		body: JSON.stringify(postData)
	};

	return new Promise((resolve, reject) => {
		request(options, (err, res, body) => {
			if (err) {
				reject(err);
			} else {
				body = JSON.parse(body);
				const statusIsOkay = res.statusCode === 200;

				const resolution = {
					statusCode: res.statusCode,
					username: statusIsOkay ? body.username : null,
					accessToken: statusIsOkay ? body.access_token : null,
					statusError: statusIsOkay ? null : body
				};

				if (statusIsOkay) {
					db.User.findOrCreate({
						where: {
							username: resolution.username
						},
						defaults: {
							access_token: resolution.accessToken,
							hash: md5(resolution.username)
						}
					}).spread((user) => {
						user.access_token = resolution.accessToken;
						user.save();
					});
				}

				resolve(resolution);
			}
		});
	});
};

module.exports = {
	retrieveAccessToken: retrieveAccessToken,
	retrieveRequestToken: retrieveRequestToken
};
