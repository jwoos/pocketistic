'use strict';

module.exports = function(sequelize, DataTypes) {
	let Session = sequelize.define('Session', {
		sid: {
			allowNull: false,
			primaryKey: true,
			type: DataTypes.UUID
		},
		sess: {
			allowNull: false,
			type: DataTypes.STRING
		},
		expire: {
			allowNull: false,
			type: DataTypes.DATE(6)
		},
		user_id: {
			references: {
				model: 'user',
				key: 'id'
			},
			type: DataTypes.INTEGER
		}
	}, {
		classMethods: {
			associate: function(models) {}
		},
		freezeTableName: true,
		tableName: 'session',
		timestamps: false,
	});

	return Session;
};
