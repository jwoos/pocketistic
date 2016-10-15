'use strict';

module.exports = (sequelize, DataTypes) => {
	let Article = sequelize.define('Article', {
		user_username: {
			references: {
				model: 'user',
				key: 'username'
			},
			type: DataTypes.STRING
		},
		path: {
			type: DataTypes.STRING,
			allowNull: false
		},
		version: {
			type: Sequelize.INTEGER,
			allowNull: false
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
