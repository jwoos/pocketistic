'use strict';

const express = require('express');
const router = express.Router();
const debug = require('debug')('pocketistic:route-authentication');

const authentication = require('../controllers/authentication');

const config = require('../config');

// authentication endpoints
router.get('/request', (req, res) => {
	const sess = req.session;

	authentication.retrieveRequestToken().then((resolution) => {
		if (resolution.statusCode !== 200) {
			res.status(resolution.statusCode).send(resolution.statusError);
		} else {
			sess.requestToken = resolution.requestToken;

			res.send(resolution.redirect);
		}
	}, (e) => {
		res.status(502).send(e);
	}).catch((e) => {
		debug(e);

		res.status(500).send('Error try again later!');
	});
});

router.get('/access', (req, res) => {
	const sess = req.session;

	authentication.retrieveAccessToken(sess.requestToken).then((resolution) => {
		if (resolution.statusCode !== 200) {
			res.status(resolution.statusCode).send(resolution.statusError);
		} else {
			sess.accessToken = resolution.accessToken;
			sess.username = resolution.username;

			res.send('Authenticated!');
		}
	}, (e) => {
		res.status(502).send(e);
	}).catch((e) => {
		debug(e);

		res.status(500).send('Error try again later!');
	});
});

module.exports = router;
