'use strict';

module.exports = function(sequelize, DataTypes) {
	var Session = sequelize.define('Session', {
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
			associate: function(models) {
				// associations can be defined here
			}
		},
		freezeTableName: true,
		tableName: 'session',
		timestamps: false,
	});
	return Session;
};
