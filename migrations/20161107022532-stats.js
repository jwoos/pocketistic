'use strict';

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('stat', {
			id: {
				primaryKey: true,
				autoIncrement: true,
				type: Sequelize.INTEGER
			},
			username: {
				references: {
					model: 'user',
					key: 'username'
				},
				type: Sequelize.STRING
			},
			unread_words: {
				type: Sequelize.INTEGER,
				allowNull: true
			},
			read_words: {
				type: Sequelize.INTEGER,
				allowNull: true
			},
			domains: {
				type: Sequelize.JSON,
				allowNull: true
			},
			read_articles: {
				type: Sequelize.INTEGER,
				allowNull: true
			},
			unread_articles: {
				type: Sequelize.INTEGER,
				allowNull: true
			}
		});
	},
	down: (queryInterface) => {
		return queryInterface.dropTable('stat');
	}
};
