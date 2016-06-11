'use strict';

const pg = require('pg');
const data = require('../data');

if process.env.NODE_ENV === 'production' {
	pg.defaults.ssl = true;
}

pg.connect(data.pgConnection, function(err, client, done) {
	if (err) {
		return console.log(err);
	}

	let query = client.query(`
			CREATE TABLE links(
				id SERIAL PRIMARY KEY NOT NULL,
				url TEXT NOT NULL
				)
			`);

	query.on('error', function(err) {
		console.log(err);
	});

	query.on('end', function() {
		console.log('Created session table');
		done();
	});
});
