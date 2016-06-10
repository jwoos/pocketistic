'use strict';

const express = require('express');
const router = express.Router();

const Authenticator = require('../controllers/authentication');
const Proxy = require('../controllers/proxy')
const data = require('../data');

let authAgent = new Authenticator(data.consumerKey, `${data.url}/auth/access`, '');

let proxy;

/* GET home page. */
router.get('/', (req, res, next) => {
	res.render('index', {});
});

router.get('/home', (req, res, next) => {
	if (!authAgent.authData.access_token && !proxy.authData.access_token) {
		res.redirect('/');
	} else {
		res.render('home', {userName: proxy.userName});
	}
});

router.post('/auth/request', (req, res, next) => {
	if (req.body.token) {
		authAgent.authData.access_token = token;
		authAgent.userName = userName;
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

router.post('/auth/access', (req, res, next) => {
	authAgent.retrieveAccessToken((response) => {
		if (response.error) {
			res.status(502).send(response.error);
		} else {
			res.send(response);
			proxy = new Proxy(authAgent.authData, authAgent.userName);
		}
	});
});

router.get('/auth/access', (req, res, next) => {
	if (authAgent)
	res.render('login', {});
});

router.get('/proxy/retrieve', (req, res, next) => {

});

module.exports = router;
