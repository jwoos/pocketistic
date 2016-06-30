'use strict';

module.exports = function(sequelize, DataTypes) {
	var User = sequelize.define('User', {
		username: {
			allowNull: false,
			type: DataTypes.STRING
		}
	}, {
		classMethods: {
			associate: function(models) {
				// associations can be defined here
			}
		},
		freezeTableName: true,
		tableName: 'user',
		timestamps: true
	});
	return User;
};
