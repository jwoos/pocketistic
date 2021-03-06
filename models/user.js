'use strict';

module.exports = (sequelize, DataTypes) => {
	const User = sequelize.define('User', {
		username: {
			allowNull: false,
			primaryKey: true,
			type: DataTypes.STRING
		},
		raw_update: {
			allowNull: true,
			type: DataTypes.DATE(6)
		},
		parsed_update: {
			allowNull: true,
			type: DataTypes.DATE(6)
		},
		hash: {
			allowNull: false,
			type: DataTypes.STRING,
			unique: true
		},
		access_token: {
			allowNull: false,
			type: DataTypes.STRING,
			unique: true
		}
	}, {
		classMethods: {
			associate: () => {}
		},
		freezeTableName: true,
		tableName: 'user',
		timestamps: false
	});

	return User;
};
