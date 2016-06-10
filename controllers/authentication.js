'use strict';

const http = require('http');

const request = require('request');

const data = require('../data');

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
		let reponse = {};

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
				console.log(err);
				reponse.error = err;
				fn(response);
				return;
			}

			console.log(body);
			this._requestToken = body.code;
			this.accessPostData.code = this._requestToken;

			let url = `https://getpocket.com/auth/authorize?request_token=${this._requestToken}&redirect_uri=${this._redirectUrl}`

			response.redirect = url;
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
			url: data.apiRequest,
			method: 'POST',
			headers: {
				'Content-Type': 'application/json; charset=UTF-8',
				'X-Accept': 'application/json',
			},
			body: JSON.stringify(this.accessPostData)
		};

		request(options, (err, res, body) => {
			if (err) {
				console.log(err);
				response.error = err;
				fn(response);
				return;
			}

			console.log(body);
			this.authData.access_token = body.access_token;
			this.userName = body.username;

			response.userName = this.userName;
			response.accessToken = this.accessToken;

			fn(response);
		});
	}
}

module.exports = Authenticator;
