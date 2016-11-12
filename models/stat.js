'use strict';

module.exports = (sequelize, DataTypes) => {
	let Stat = sequelize.define('Stat', {
		id: {
			primaryKey: true,
			autoIncrement: true,
			type: DataTypes.INTEGER
		},
		username: {
			references: {
				model: 'user',
				key: 'username'
			},
			type: DataTypes.STRING
		},
		unread_words: {
			type: DataTypes.INTEGER,
			allowNull: true
		},
		read_words: {
			type: DataTypes.INTEGER,
			allowNull: true
		},
		domains: {
			type: DataTypes.JSON,
			allowNull: true
		},
		read_articles: {
			type: DataTypes.INTEGER,
			allowNull: true
		},
		unread_articles: {
			type: DataTypes.INTEGER,
			allowNull: true
		}
	}, {
		classMethods: {
			associate: (models) => {}
		},
		freezeTableName: true,
		tableName: 'stat',
		timestamps: false,
	});

	return Stat;
};
