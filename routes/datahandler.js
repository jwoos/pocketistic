'use strict';

const debug = require('debug')('pocketistic:datahandler-route');
const express = require('express');
const router = express.Router();

const datahandler = require('../controllers/datahandler');
const errors = require('../utils/errors');
const validate = require('../utils/validation');

router.get('/', (req, res) => {
	if (!validate.validateRequest(req)) {
		return res.status(400).send('Invalid request');
	}

	let username = req.session.username;

	datahandler.retrieveLocal(username).then((result) => {
		res.send(result);
	}).catch((e) => {
		if (e.error === 'USER_NOT_FOUND') {
			res.status(500).send('Server error');
			return;
		}

		datahandler.retrieveProxy(username).then((innerResult) => {
			datahandler.saveRaw(innerResult.user, innerResult.data);

			res.send(innerResult);
		}).catch((e) => {
			res.status(500).send('Server error');
		});
	});
});

router.get('/raw/update', (req, res) => {
	if (!validate.validateRequest(req)) {
		return res.status(400).send('Invalid request');
	}

	let username = req.session.username;

	datahandler.retrieveProxy(username).then((result) => {
		datahandler.saveRaw(result.user, result.data).catch((e) => {
			debug('error saving');
		});

		res.send(result);
	}).catch((e) => {
		res.status(500).send('Server error');
	});
});

router.post('/parsed/update', (req, res) => {
	if (!validate.validateRequest(req)) {
		return res.status(400).send('Invalid request');
	}

	let data = req.body;
	let username = req.session.username;

	if (!validate.validateParsedData(data)) {
		return res.status(400).send('Invalid post data');
	}

	datahandler.saveParsed(username, data).then(() => {
		res.status(201).send('Saved');
	}).catch((e) => {
		debug(e);
		res.status(500).send('Error saving');
	});
});

module.exports = router;
