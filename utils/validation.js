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
	if (!req.session.accessToken) {
		return false;
	}
}

module.exports = {
	validateParsedData: validateParsedData
};
