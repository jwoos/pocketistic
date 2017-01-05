'use strict';

function snakeToCamel(arg) {
	let temp = arg.split('_');
	for (let i = 1; i < temp.length; i++) {
		temp[i] = temp[i][0].toUpperCase() + temp.slice(1);
	}

	return temp.join('');
}

function camelToSnake(arg) {
}

function transformKeys(obj, type = 'camel') {
	let temp = {};
	let keys = Object.keys(obj);
	let transformedKeys;

	if (type === 'camel') {
		transformedKeys = keys.map((elem) => {
			snakeToCamel(elem);
		});
	} else {
		transformedKeys = keys.map((elem) => {
			camelToSnake(elem);
		});
	}

	for (let i = 0; i < keys.length; i++) {
		temp[transformedKeys[i]] = obj[keys[i]];
	}

	return obj;
}

function getDomain(link) {
	const re = /^(?:https?:\/\/)?(?:[^@\/\n]+@)?(?:www\.)?([^:\/\n]+)/;
	const matches = link.match(re);

	return matches[1];
}

module.exports = {
	snakeToCamel,
	getDomain
};

