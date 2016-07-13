'use strict';

module.exports = (sequelize, DataTypes) => {
	let Article = sequelize.define('Article', {
		user_id: {
			references: {
				model: 'user',
				key: 'id'
			},
			type: DataTypes.INTEGER
		},
		item_id: {
			primaryKey: true,
			type: DataTypes.STRING
		},
		status: {
			allowNull: false,
			type: DataTypes.INTEGER
		},
		word_count: {
			allowNull: false,
			type: DataTypes.INTEGER
		},
		given_url: {
			allowNull: false,
			type: DataTypes.STRING
		},
		resolved_url: {
			allowNull: false,
			type: DataTypes.STRING
		},
		given_title: {
			allowNull: false,
			type: DataTypes.STRING
		},
		resolved_title: {
			allowNull: false,
			type: DataTypes.STRING
		},
		excerpt: {
			allowNull: true,
			type: DataTypes.STRING
		},
		time_added: {
			allowNull: false,
			type: DataTypes.TIMESTAMP
		},
		time_read: {
			allowNull: false,
			type: DataTypes.TIMESTAMP
		}
	}, {
		classMethods: {
			associate: (models) => {}
		},
		freezeTableName: true,
		tableName: 'article',
		timestamps: false
	});

	return Article;
};
