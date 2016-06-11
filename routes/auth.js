'use strict';

const express = require('express');
const router = express.Router();

const data = require('../data');
const Authenticator = require('../controllers/authentication');

let authAgent = new Authenticator(data.consumerKey, `${data.url}/auth/access`, '');

// authentication endpoints
router.get('/request', (req, res, next) => {
	let sess = req.session;

	if (sess.accessToken) {
		authAgent.authData.access_token = sess.accessToken;
		authAgent.userName = sess.userName;
		res.send(`${data.url}/home`);

		proxy = new Proxy(authAgent.authData, authAgent.userName);
	} else {
		authAgent.retrieveRequestToken((response) => {
			if (response.error) {
				res.status(502).send(response.error);
			} else {
				res.send(response.redirect);
			}
		});
	}
});

router.get('/access', (req, res, next) => {
	let sess = req.session;

	authAgent.retrieveAccessToken((response) => {
		if (response.error) {
			res.status(502).send(response.error);
		} else {
			req.session.accessToken= response.accessToken;
			req.session.userName = response.userName;
			res.send('Authenticated!');
			proxy = new Proxy(authAgent.authData, authAgent.userName);
		}
	});
});

module.exports = router;
