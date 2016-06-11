'use strict';

const pg = require('pg');
const data = require('../data');

if (process.env.NODE_ENV === 'production') {
	pg.defaults.ssl = true;
}

pg.connect(data.pgConnection, function(err, client, done) {
	if (err) {
		return console.log(err);
	}

	let query = client.query(`
		CREATE TABLE "session" (
		  "sid" varchar NOT NULL COLLATE "default",
			"sess" json NOT NULL,
			"expire" timestamp(6) NOT NULL
		)
		WITH (OIDS=FALSE);
		ALTER TABLE "session" ADD CONSTRAINT "session_pkey" PRIMARY KEY ("sid") NOT DEFERRABLE INITIALLY IMMEDIATE;
	`);

	query.on('error', function(err) {
		console.log(err);
	});

	query.on('end', function() {
		console.log('Created session table');
		done();
	});
});
