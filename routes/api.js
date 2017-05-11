'use strict';

const express = require('express');
const router = express.Router();

const authentication = require('../controllers/authentication');
const datahandler = require('../controllers/datahandler');
const validate = require('../utils/validation');

router.get('/auth/request', (req, res) => {
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
		res.status(500).send('Error try again later!');
	});
});

router.get('/auth/access', (req, res) => {
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
		res.status(500).send('Error try again later!');
	});
});

router.get('/data', (req, res) => {
	if (!validate.validateRequest(req)) {
		return res.status(401).send('Unauthorized request');
	}

	const username = req.session.username;
	const config = {};

	datahandler.retrieve(username, false, config).then((resolution) => {
		res.send(resolution);
	}).catch((e) => {
		res.status(500).send('Server error');
	});
});

router.get('/data/update', (req, res) => {
	if (!validate.validateRequest(req)) {
		return res.status(401).send('Unauthorized request');
	}

	const username = req.session.username;
	const config = {};

	datahandler.retrieve(username, true, config).then((resolution) => {
		res.send(resolution);
	}).catch((e) => {
		res.status(500).send('Server error');
	});
});
