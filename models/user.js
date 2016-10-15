'use strict';

module.exports = (sequelize, DataTypes) => {
	let User = sequelize.define('User', {
		id: {
			autoIncrement: true,
			primaryKey: true,
			type: DataTypes.INTEGER
		},
		username: {
			allowNull: false,
			unique: true,
			type: DataTypes.STRING
		},
		last_update: {
			allowNull: true,
			type: DataTypes.DATE(6)
		},
		hash: {
			allowNull: false,
			type: DataTypes.STRING,
			unique: true
		}
	}, {
		classMethods: {
			associate: (models) => {}
		},
		freezeTableName: true,
		tableName: 'user',
		timestamps: false
	});

	return User;
};
