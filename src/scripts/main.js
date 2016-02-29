'use strict';

let consumerKey = '51787-0f16e59e8e3c7ee3d8c777c4';
let base = 'https://getpocket.com/v3';
let redirect = '192.168.174.101:3000';

class Authentication {
	constructor(consumerKey, redirectUri, state='') {
		this._consumerKey = consumerKey;
		this._redirectUri = redirectUri;
		this._state = state;
	}

	retrieveRequestToken() {
		let url = base + '/oauth/request';
		this._tokenjqXHR = $.ajax(url,
			{
				contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
				method: 'POST',
				timeout: 10000,
				data: {
					"consumer_key": this._consumerKey,
					"redirect_uri": this._redirectUri,
					"state": this._state
				},
				dataType: 'json'
			}
		);

		this._tokenjqXHR.done(function(data, textStatus, jqXHR) {
			console.log('success');
			console.log(data);
		});

		this._tokenjqXHR.fail(function(jqXHR, textStatus, errorThrown) {
			console.log('error');
			console.log(errorThrown);
		});
	}
}

$(document).ready(function() {
	let token = new Authentication(consumerKey, redirect);
	token.retrieveRequestToken();
});
