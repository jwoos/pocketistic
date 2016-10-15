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
