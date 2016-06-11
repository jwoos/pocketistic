'use strict';

const express = require('express');
const router = express.Router();

const data = require('../data');

router.get('/', (req, res, next) => {
	let sess = req.session;

	if (sess.accessToken) {
		res.render('home', {userName: userName});
	} else {
		res.redirect('/login')
	}
});

router.get('/login', (req, res, next) => {
	if (req.query.auth) {
		res.render('login', {});
	} else {
		res.render('index', {});
	}
});

module.exports = router;
