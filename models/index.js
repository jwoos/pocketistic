'use strict';

const fs = require('fs');
const path = require('path');

const Sequelize = require('sequelize');
const pg = require('pg');

let basename = path.basename(module.filename);
let env = process.env.NODE_ENV || 'development';
let config = require(__dirname + '/../config/config.json')[env];
let db = {};
let sequelize;

if (config.use_env_variable) {
	sequelize = new Sequelize(process.env[config.use_env_variable]);
} else {
	sequelize = new Sequelize(config.url);
}

fs.readdirSync(__dirname)
	.filter((file) => {
		return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
	})
	.forEach((file) => {
		let model = sequelize['import'](path.join(__dirname, file));
		db[model.name] = model;
	});

Object.keys(db).forEach((modelName) => {
	if (db[modelName].associate) {
		db[modelName].associate(db);
	}
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.pg = pg;

module.exports = db;
