'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('session', {
			sid: {
				allowNull: false,
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
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('session');
  }
};
