'use strict';

const express = require('express');
const path = require('path');
const logger = require('morgan');
const bodyParser = require('body-parser');
const uuid = require('node-uuid');
const session = require('express-session');
const pgSession = require('connect-pg-simple')(session);
const sass = require('node-sass-middleware');
const pug = require('pug');

// routes
const index = require('./routes/index');
const auth = require('./routes/auth');
const proxy = require('./routes/proxy');

const db = require('./models/index');
const data = require('./data');

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
	genid: (req) => {
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
app.use(bodyParser.urlencoded({ extended: false }));
app.use(sass({
	src: path.join(__dirname, 'public'),
	dest: path.join(__dirname, 'public'),
	indentedSyntax: true,
	sourceMap: true
}));
app.use(express.static(path.join(__dirname, 'public')));

// routes
app.use('/', index);
app.use('/auth/', auth);
app.use('/proxy/', proxy);

// catch 404 and forward to error handler
app.use((req, res, next) => {
	let err = new Error('Not Found');
	err.status = 404;
	next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
	app.use((err, req, res, next) => {
		res.status(err.status || 500);
		res.render('error', {
			message: err.message,
			error: err
		});
	});
}

// production error handler
// no stacktraces leaked to user
app.use((err, req, res, next) => {
	res.status(err.status || 500);
	res.render('error', {
		message: err.message,
		error: {}
	});
});

module.exports = app;
