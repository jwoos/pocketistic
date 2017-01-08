'use strict';

module.exports = (sequelize, DataTypes) => {
	const Session = sequelize.define('Session', {
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
			associate: () => {}
		},
		freezeTableName: true,
		tableName: 'session',
		timestamps: false,
	});

	return Session;
};
