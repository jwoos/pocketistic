'use strict';

const debug = require('debug')('pocketistic:route-index');
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
	const sess = req.session;

	if (sess.accessToken) {
		res.render('index', {username: sess.username});
	} else {
		res.redirect('/login');
	}
});

router.get('/login', (req, res) => {
	const sess = req.session;

	if (sess.accessToken) {
		res.redirect('/');
	} else {
		res.render('login', {end: req.query.end});
	}
});

module.exports = router;
