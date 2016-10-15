'use strict';

function hashString(hashThis) {
	let hash = 0, chr;

	if (hashThis.length === 0) {
		return hash;
	}

	for (let i = 0; i < hashThis.length; i++) {
		chr = hashThis.charCodeAt(i);
		hash = ((hash << 5) - hash) + chr;
		hash |= 0; // Convert to 32bit integer
	}

	return hash;
};

module.exports = {
	hash: hashString
};
