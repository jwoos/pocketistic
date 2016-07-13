'use strict';

module.exports = {
	up: function(queryInterface, Sequelize) {
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
			}
		});
	},
	down: function(queryInterface, Sequelize) {
		return queryInterface.dropTable('user');
	}
};
