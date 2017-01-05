'use strict';

const snakeToCamel = (arg) => {
	let temp = arg.split('_');
	for (let i = 1; i < temp.length; i++) {
		temp[i] = temp[i][0].toUpperCase() + temp.slice(1);
	}

	return temp.join('');
};

const camelToSnake = (arg) => {};

const transformKeys = (obj, type = 'camel') => {
	const temp = {};
	const keys = Object.keys(obj);
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
};

const getDomain = (link) => {
	const re = /^(?:https?:\/\/)?(?:[^@\/\n]+@)?(?:www\.)?([^:\/\n]+)/;
	const matches = link.match(re);

	return matches[1];
};

module.exports = {
	snakeToCamel,
	camelToSnake,
	transformKeys,
	getDomain
};

