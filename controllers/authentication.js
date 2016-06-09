'use strict';

const http = require('http');

const request = require('request');

const data = require('../data');

class Authenticator {
	constructor(consumerKey, redirectUrl, state) {
		this._consumerKey = consumerKey;
		this._redirectUrl = redirectUrl;
		this._state = state;

		this.postData = {
			consumer_key: consumerKey,
			redirect_uri: redirectUrl,
			state: state
		};
	}

	retrieveRequestToken(fn) {
		let options = {
			url: 'https://getpocket.com/v3/oauth/request',
			method: 'POST',
			headers: {
				'Content-Type': 'application/json; charset=UTF-8',
				'X-Accept': 'application/json',
			},
			body: JSON.stringify(this.postData)
		};

		request(options, (err, res, body) => {
			if (err) {
				console.log(err);
				return;
			}

			console.log(res);
			console.log(body);
			this._requestToken = body.code;
		});

		let url = `https://getpocket.com/auth/authorize?request_token=${this._requestToken}&redirect_uri=${this._redirectUrl}`

		fn(url);
	}
}

module.exports = Authenticator;
