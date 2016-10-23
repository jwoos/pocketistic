'use strict';

const bluebird = require('bluebird');

module.exports = {
	up: function (queryInterface, Sequelize) {
		return bluebird.all([
			queryInterface.renameColumn('user', 'last_update', 'raw_update'),
			queryInterface.addColumn('user', 'parsed_update', {
				type: Sequelize.DATE(6),
				allowNull: true
			})
		]);
	},

	down: function (queryInterface, Sequelize) {
		return bluebird.all([
			queryInterface.renameColumn('user', 'raw_update', 'last_update'),
			queryInterface.removeColumn('user', 'parsed_update')
		]);
	}
};
