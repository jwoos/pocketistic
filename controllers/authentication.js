'use strict';

const http = require('http');

const data = require('../data');

class Authenticator {
	constructor(consumerKey, redirectUrl, state='') {
		this._consumerKey = consumerKey;
		this._redirectUrl = redirectUrl;
		this._state = state;
	}

	retrieveRequestToken() {
	}
}
