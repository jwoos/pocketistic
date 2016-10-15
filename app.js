'use strict';

const path = require('path');

const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const uuid = require('node-uuid');
const session = require('express-session');
const pgSession = require('connect-pg-simple')(session);
const sass = require('node-sass-middleware');
const pug = require('pug');

// routes
const auth = require('./routes/auth');
const datahandler = require('./routes/datahandler');
const index = require('./routes/index');

const data = require('./data');
const db = require('./models/index');

const app = express();

app.disable('x-powered-by');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('pug', pug.renderFile);
app.set('view engine', 'pug');

app.use(logger('dev'));

let sess = {
	store: new pgSession({
		pg: db.pg,
		conString: data.pgConnection,
		tableName: 'session'
	}),
	secret: 'N#E1kbzbI$H!0E9%',
	name: 'sessionId',
	resave: false,
	saveUninitialized: false,
	genid: () => {
		return uuid.v4();
	},
	cookie: {
		secure: true,
		httpOnly: true,
		maxAge: 60 * 60 * 1000 * 24 * 7 // 7 days
	}
};

if (app.get('env') === 'development') {
	sess.cookie.secure = false;
}

app.use(session(sess));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: false
}));

if (app.get('env') === 'development') {
	app.use(sass({
		root: path.join(__dirname, 'public'),
		src: 'stylesheets',
		dest: 'stylesheets',
		indentedSyntax: true,
		sourceMap: true,
		debug: true,
		outputStyle: 'expanded'
	}));
} else {
	app.use(sass({
		root: path.join(__dirname, 'public'),
		src: 'stylesheets',
		dest: 'stylesheets',
		indentedSyntax: true,
		sourceMap: false,
		debug: false,
		outputStyle: 'compressed'
	}));
}
app.use(express.static(path.join(__dirname, 'public')));

// routes
app.use('/', index);
app.use('/auth/', auth);
app.use('/data/', datahandler);

// catch 404 and forward to error handler
app.use((req, res, next) => {
	let err = new Error('Not Found');
	err.status = 404;
	next(err);
});

// error handlers

if (app.get('env') === 'development') {
	// development error handler
	// will print stacktrace
	app.use((err, req, res) => {
		res.status(err.status || 500);
		res.render('error', {
			message: err.message,
			error: err
		});
	});
} else {
	// production error handler
	// no stacktraces leaked to user
	app.use((err, req, res) => {
		res.status(err.status || 500);
		res.render('error', {
			message: err.message,
			error: {}
		});
	});
}

module.exports = app;
