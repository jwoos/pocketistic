'use strict';

const debug = require('debug')('pocketistic:authentication');
const md5 = require('blueimp-md5');
const request = require('request');

const data = require('../data');
const db = require('../models/index');

class Authenticator {
	constructor(consumerKey, redirectUrl, state) {
		this._consumerKey = consumerKey;
		this._redirectUrl = redirectUrl;
		this._state = state;

		this.requestPostData = {
			consumer_key: consumerKey,
			redirect_uri: redirectUrl,
			state: state
		};

		this.accessPostData = {
			consumer_key: consumerKey,
			code: ''
		};

		this.authData = {
			consumer_key: consumerKey,
			access_token: ''
		};
	}

	retrieveRequestToken(fn) {
		let response = {};

		let options = {
			url: data.apiRequest,
			method: 'POST',
			headers: {
				'Content-Type': 'application/json; charset=UTF-8',
				'X-Accept': 'application/json',
			},
			body: JSON.stringify(this.requestPostData)
		};

		request(options, (err, res, body) => {
			if (err) {
				debug(err);
				response.error = err;
			} else {
				response.statusCode = res.statusCode;

				if (res.statusCode === 200) {
					this._requestToken = JSON.parse(body).code;
					this.accessPostData.code = this._requestToken;

					let url = `https://getpocket.com/auth/authorize?request_token=${this._requestToken}&redirect_uri=${this._redirectUrl}`;

					response.redirect = url;
				} else {
					response.statusError = body;
				}
			}

			fn(response);
		});
	}

	retrieveAccessToken(fn) {
		let response = {};

		if (!this._requestToken) {
			response.error = 'Invalid request token';
			fn(response);
			return;
		}

		let options = {
			url: data.apiAccess,
			method: 'POST',
			headers: {
				'Content-Type': 'application/json; charset=UTF-8',
				'X-Accept': 'application/json',
			},
			body: JSON.stringify(this.accessPostData)
		};

		request(options, (err, res, body) => {
			if (err) {
				debug(err);
				response.error = err;
			} else {
				response.statusCode = res.statusCode;

				if (res.statusCode === 200) {
					this.authData.accessToken = JSON.parse(body).access_token;
					this.username = JSON.parse(body).username;

					response.username = this.username;
					response.accessToken = this.authData.accessToken;

					db.User.findOrCreate({
						where: {
							username: response.username
						},
						defaults: {
							access_token: response.accessToken,
							hash: md5(response.username)
						}
					}).spread((user) => {
						user.access_token = response.accessToken;
						user.save();
					});
				} else {
					debug(res.headers);
					response.statusError = body;
				}
			}

			fn(response);
		});
	}
}

module.exports = Authenticator;
