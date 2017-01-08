'use strict';

const validateParsedData = (data) => {
	if (!data) {
		return false;
	}

	if (typeof data !== 'object' || data.toString() !== '[object Object]') {
		return false;
	}

	return true;
};

const validateRequest = (req) => {
	if (!req.session.accessToken) {
		return false;
	}

	return true;
};

module.exports = {
	validateParsedData,
	validateRequest
};
