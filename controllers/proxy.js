'use strict';

const request = require('request');

const data = require('../data');

function retrieve(accessToken, dat, fn) {
	dat = dat || {};
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
		consumer_key: data.consumerKey
	};

	Object.assign(getData, dat);

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
			//console.log(err);
			response.error = err;
		} else {
			response.statusCode = res.statusCode;

			if (res.statusCode === 200) {
				let respJson = JSON.parse(body);
				response.json = respJson;
			} else {
				//console.log(res.headers);
				response.statusError = body;
			}
		}

		fn(response);
	});
}

module.exports = {
	retrieve: retrieve
};
