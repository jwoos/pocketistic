'use strict';

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('session', {
			sid: {
				primaryKey: true,
				type: Sequelize.UUID
			},
			sess: {
				allowNull: false,
				type: Sequelize.JSON
			},
			expire: {
				allowNull: false,
				type: Sequelize.DATE(6)
			}
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('session');
	}
};
