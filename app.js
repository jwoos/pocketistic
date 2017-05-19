'use strict';

const path = require('path');

const bodyParser = require('body-parser');
const express = require('express');
const logger = require('morgan');
const pug = require('pug');
const sass = require('node-sass-middleware');
const session = require('express-session');
const pgSession = require('connect-pg-simple')(session);
const uuid = require('node-uuid');

const index = require('./routes/index');
const api = require('./routes/api');

const config = require('./config');
const db = require('./models/index');

const app = express();

app.disable('x-powered-by');

app.use(logger('dev'));

const sess = {
	store: new pgSession({
		pg: db.pg,
		conString: config.pgConnection,
		tableName: 'session'
	}),
	secret: 'N#E1kbzbI$H!0E9%',
	name: 'sessionId',
	resave: false,
	saveUninitialized: false,
	genid: () => uuid.v4(),
	cookie: {
		secure: (app.get('env') === 'development') ? false : true,
		httpOnly: true,
		maxAge: 60 * 60 * 1000 * 24 * 7 // 7 days
	}
};

app.set('views', path.join(__dirname, 'views'));
app.engine('pug', pug.renderFile);
app.set('view engine', 'pug');

if (app.get('env') === 'development') {
	app.use(sass({
		src: path.join(__dirname, 'public'),
		dest: path.join(__dirname, 'public'),
		indentedSyntax: false,
		sourceMap: true,
		debug: true,
		outputStyle: 'nested',
		force: true,
		response: false
	}));
} else {
	app.use(sass({
		src: path.join(__dirname, 'public'),
		dest: path.join(__dirname, 'public'),
		indentedSyntax: false,
		sourceMap: false,
		debug: false,
		outputStyle: 'compressed',
		response: false
	}));
}

app.use(session(sess));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: false
}));

app.use(express.static(path.join(__dirname, 'public')));

// routes
app.use('/', index);
app.use('/api/', api);

// catch 404 and forward to error handler
app.use((req, res, next) => {
	const err = new Error('Not Found');
	err.status = 404;
	next(err);
});

// error handlers
app.use((err, req, res) => {
	res.status(err.status || 500);
	res.render('error', {
		message: err.message,
		error: (app.get('env') === 'development') ? err : {}
	});
});

module.exports = app;
