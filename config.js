'use struct';

const constants = {
	consumerKey: '56034-b789e27a99df914a8a17e079',
	apiBase: 'https://getpocket.com/v3',
	apiRequest: '/oauth/request',
	apiAccess: '/oauth/authorize',
	apiRedirect: 'https://getpocket.com/auth/authorize',
	pgConnection: process.env.DATABASE_URL || 'postgres://postgres:1234567890@db/pocketistic',
	port: process.env.PORT || 8080,
	url: process.env.NODE_ENV ? 'https://sheltered-badlands-26515.herokuapp.com' : 'http://dev-server.site',
	development: {
		url: 'postgres://postgres:123456789@localhost/pocketistic',
		dialect: 'postgres',
		seeder_storage: 'sequelize'
	},
	test: {
		username: 'root',
		password: null,
		database: 'pocketistic',
		host: '127.0.0.1',
		dialect: 'postgres'
	},
	production: {
		url: {
			use_env_variable: 'process.env.DATABASE_URL'
		},
		dialect: 'postgres',
		seeder_storage: 'sequelize'
	}
};

module.exports = constants;
