'use struct';

const constants = {
	consumerKey: '51787-0f16e59e8e3c7ee3d8c777c4',
	apiBase: 'https://getpocket.com/v3/',
	pgConnection: process.env.DATABASE_URL || 'postgres://ubuntu:123456789@localhost/pocketistic',
	port: process.env.PORT || 8080;
};

module.exports = constants;
