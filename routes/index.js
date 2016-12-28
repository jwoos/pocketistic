'use strict';

const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
	let sess = req.session;

	if (sess.accessToken) {
		res.render('index', {username: sess.username});
	} else {
		res.redirect('/login');
	}
});

router.get('/login', (req, res) => {
	let sess = req.session;

	if (sess.accessToken) {
		res.redirect('/');
	} else {
		res.render('login', {end: req.query.end});
	}
});

module.exports = router;
