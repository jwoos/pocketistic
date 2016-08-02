'use strict';

module.exports = (sequelize, DataTypes) => {
	let Session = sequelize.define('Session', {
		sid: {
			allowNull: false,
			primaryKey: true,
			type: DataTypes.UUID
		},
		sess: {
			allowNull: false,
			type: DataTypes.JSON
		},
		expire: {
			allowNull: false,
			type: DataTypes.DATE(6)
		}
	}, {
		classMethods: {
			associate: (models) => {}
		},
		freezeTableName: true,
		tableName: 'session',
		timestamps: false,
	});

	return Session;
};
