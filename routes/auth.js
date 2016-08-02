'use strict';

const express = require('express');
const router = express.Router();

const Authenticator = require('../controllers/authentication');

const db = require('../models/index');

const data = require('../data');

let authAgent = new Authenticator(data.consumerKey, `${data.url}/login?end=true`, '');

// authentication endpoints
router.get('/request', (req, res, next) => {
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

router.get('/access', (req, res, next) => {
	let sess = req.session;

	authAgent.retrieveAccessToken((response) => {
		if (response.error) {
			res.status(502).send(response.error);
		} else if (response.statusCode !== 200) {
			res.status(response.statusCode).send(response.statusError);
		} else {
/*
 *      db.User.findOrCreate({
 *        where: {
 *          username: response.userName
 *        }
 *      }).spread((user, created) => {
 *        console.log(sess);
 *        sess.accessToken = response.accessToken;
 *        sess.userName = response.userName;
 *
 *        sess.userId = user.get({
 *          plain: true
 *        }).id;
 *
 *      });
 */

			sess.accessToken = response.accessToken;
			sess.userName = response.userName;

			res.send('Authenticated!');
		}
	});
});

module.exports = router;
