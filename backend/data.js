'use struct';

const constants = {
	consumerKey: '56034-b789e27a99df914a8a17e079',
	apiBase: 'https://getpocket.com/v3',
	apiRequest: 'https://getpocket.com/v3/oauth/request',
	apiAccess: 'https://getpocket.com/v3/oauth/authorize',
	pgConnection: process.env.DATABASE_URL || 'postgres://postgres:123456789@localhost/pocketistic',
	port: process.env.PORT || 8080,
	url: process.env.NODE_ENV ? 'https://sheltered-badlands-26515.herokuapp.com' : 'http://dev-server.site'
};

module.exports = constants;
