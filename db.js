'use strict';

const pg = require('pg');
const Sequelize = require('sequelize');

const data = require('./data');

const sequelize = new Sequelize(data.pgConnection);

const Session = require('./models/session');

// authenticate
sequelize.authenticate().then(() => {
	console.log('Connected!');
}).catch((err) => {
	console.log(err);
});

module.exports = sequelize;
