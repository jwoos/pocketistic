'use strict';

const express = require('express');
const router = express.Router();

const data = require('../data');

router.get('/', (req, res, next) => {
	let sess = req.session;

	if (sess.accessToken) {
		res.render('index', {userName: sess.userName});
	} else {
		res.redirect('/login');
	}
});

router.get('/login', (req, res, next) => {
	let sess = req.session;

	if (sess.accessToken) {
		res.redirect('/');
	} else {
		res.render('login', {end: req.query.end});
	}
});

module.exports = router;
