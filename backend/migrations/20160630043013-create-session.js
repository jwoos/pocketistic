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
				type: Sequelize.STRING
			},
			expire: {
				allowNull: false,
				type: Sequelize.DATE(6)
			},
			user_id: {
				references: {
					model: 'user',
					key: 'id'
				},
				type: Sequelize.INTEGER
			}
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('session');
  }
};
