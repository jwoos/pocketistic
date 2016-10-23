'use strict';

function validateParsedData(data) {
	console.log(data);
	if (!data) {
		return false;
	}

	if (typeof data !== 'object' || data.toString() !== '[object Object]') {
		return false;
	}

	return true;
}

function validateRequest(req) {
	console.log(req.session.accessToken);

	if (!req.session.accessToken) {
		return false;
	}

	return true;
}

module.exports = {
	validateParsedData: validateParsedData,
	validateRequest: validateRequest
};
