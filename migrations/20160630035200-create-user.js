'use strict';

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('user', {
			username: {
				allowNull: false,
				primaryKey: true,
				type: Sequelize.STRING
			},
			last_update: {
				allowNull: true,
				type: Sequelize.DATE(6)
			},
			hash: {
				allowNull: false,
				type: Sequelize.STRING,
				unique: true
			},
			access_token: {
				allowNull: false,
				type: Sequelize.STRING,
				unique: true
			}
		});
	},
	down: (queryInterface) => {
		return queryInterface.dropTable('user');
	}
};
