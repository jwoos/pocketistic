'use strict';

const express = require('express');
const router = express.Router();

const Authenticator = require('../controllers/authentication');

const data = require('../data');

let authAgent = new Authenticator(data.consumerKey, `${data.url}/login?end=true`, '');

// authentication endpoints
router.get('/request', (req, res) => {
	authAgent.retrieveRequestToken((response) => {
		if (response.error) {
			res.status(502).send(response.error);
		} else if (response.statusCode !== 200) {
			res.status(response.statusCode).send(response.statusError);
		} else {
			res.send(response.redirect);
		}
	});
});

router.get('/access', (req, res) => {
	let sess = req.session;

	authAgent.retrieveAccessToken((response) => {
		if (response.error) {
			res.status(502).send(response.error);
		} else if (response.statusCode !== 200) {
			res.status(response.statusCode).send(response.statusError);
		} else {
			sess.accessToken = response.accessToken;
			sess.username = response.username;

			res.send('Authenticated!');
		}
	});
});

module.exports = router;
