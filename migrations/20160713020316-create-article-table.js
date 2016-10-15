'use strict';

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('article', {
			user_username: {
				references: {
					model: 'user',
					key: 'username'
				},
				type: Sequelize.STRING
			},
			path: {
				type: Sequelize.STRING,
				allowNull: false
			},
			version: {
				type: Sequelize.INTEGER,
				allowNull: false
			}
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('article');
	}
};
