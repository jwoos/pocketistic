'use strict';

const debug = require('debug')('pocketistic:datahandler-route');
const express = require('express');
const router = express.Router();

const datahandler = require('../controllers/datahandler');
const validate = require('../utils/validation');

router.get('/', (req, res) => {
	if (!validate.validateRequest(req)) {
		return res.status(401).send('Unauthorized request');
	}

	const username = req.session.username;
	const config = {};

	datahandler.retrieve(username, false, config).then((resolution) => {
		res.send(resolution);
	}).catch((e) => {
		debug(e);
		res.status(500).send('Server error');
	});
});

router.get('/update', (req, res) => {
	if (!validate.validateRequest(req)) {
		return res.status(401).send('Unauthorized request');
	}

	const username = req.session.username;
	const config = {};

	datahandler.retrieve(username, true, config).then((resolution) => {
		res.send(resolution);
	}).catch((e) => {
		debug(e);
		res.status(500).send('Server error');
	});
});

module.exports = router;
