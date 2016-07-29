'use strict';

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('article', {
			user_id: {
				references: {
					model: 'user',
					key: 'id'
				},
				type: Sequelize.INTEGER
			},
			item_id: {
				primaryKey: true,
				type: Sequelize.STRING
			},
			status: {
				type: Sequelize.INTEGER
			},
			word_count: {
				allowNull: false,
				type: Sequelize.INTEGER
			},
			given_url: {
				allowNull: false,
				type: Sequelize.STRING
			},
			resolved_url: {
				type: Sequelize.STRING
			},
			given_title: {
				allowNull: false,
				type: Sequelize.STRING
			},
			resolved_title: {
				type: Sequelize.STRING
			},
			excerpt: {
				type: Sequelize.STRING
			},
			time_added: {
				allowNull: false,
				type: Sequelize.DATE
			},
			time_read: {
				allowNull: false,
				type: Sequelize.DATE
			}
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('article');
	}
};
