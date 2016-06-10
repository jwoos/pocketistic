'use strict';

const http = require('http');

const data = require('../data');

class Proxy {
	constructor(authData, userName) {
		this._authData = authData;
		this._userName = userName;
	}
}

module.exports = Proxy;
