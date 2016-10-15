'use strict';

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('user', {
			id: {
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER
			},
			username: {
				allowNull: false,
				unique: true,
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
			}
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('user');
	}
};
