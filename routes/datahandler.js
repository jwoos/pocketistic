'use strict';

const debug = require('debug')('pocketistic:datahandler-route');
const express = require('express');
const router = express.Router();

const datahandler = require('../controllers/datahandler');
const validate = require('../utils/validation');

router.get('/update', (req, res) => {
	let accessToken = req.session.accessToken;
	let username = req.session.username;

	update(res);
});

router.get('/retrieve', (req, res) => {
	let accessToken = req.session.accessToken;
	let username = req.session.username;

	let data;
	try {
		data = datahandler.retrieve(username);
		res.send(data);
	} catch (e) {
		debug('Error retrieving from local', e);

		update(res);
	}
});

function update(res) {
	datahandler.proxyRetrieve(accessToken, (response) => {
		if (response.error) {
			res.status(502).send(response.error);
		} else if (response.statusCode !== 200) {
			res.status(response.statusCode).send(response.statusError);
		} else {
			datahandler.update(username, response.json.list);

			res.send(response.json.list);
		}
	});
}

router.post('/parsed', (req, res) => {
	let data = req.body;

	console.log(data);

	if (!validate.validateParsedData(data)) {
		return res.status(400).send('Invalid post data');
	}

	datahandler.saveParsed(req.session.username, data, (status) => {
		if (status) {
			res.status(201).send('Created data');
		} else {
			res.status(500).send('Error saving data');
		}
	});
});

module.exports = router;
