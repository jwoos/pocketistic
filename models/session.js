'use strict';

const Sequelize = require('sequelize');

const sequelize = require('../db');
const data = require('../data');

let Session = sequelize.define('session', {
	sid: {
		type: Sequelize.STRING,
		allowNull: false,
		primaryKey: true
	},
	sess: {
		type: Sequelize.JSON,
		allowNull: false
	},
	expire: {
		type: Sequelize.DATE(6),
		allowNull: false
	}
}, {
	timestamps: false,
	freezeTableName: true,
	tableName: 'session'
});

/*
 *pg.connect(data.pgConnection, function(err, client, done) {
 *  if (err) {
 *    return console.log(err);
 *  }
 *
 *  let query = client.query(`
 *    CREATE TABLE "session" (
 *      "sid" varchar NOT NULL COLLATE "default",
 *      "sess" json NOT NULL,
 *      "expire" timestamp(6) NOT NULL
 *    )
 *    WITH (OIDS=FALSE);
 *    ALTER TABLE "session" ADD CONSTRAINT "session_pkey" PRIMARY KEY ("sid") NOT DEFERRABLE INITIALLY IMMEDIATE;
 *  `);
 *
 *  query.on('error', function(err) {
 *    console.log(err);
 *  });
 *
 *  query.on('end', function() {
 *    console.log('Created session table');
 *    done();
 *  });
 *});
 */
