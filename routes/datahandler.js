'use strict';

const debug = require('debug')('pocketistic:datahandler-route');
const express = require('express');
const router = express.Router();

const datahandler = require('../controllers/datahandler');

router.get('/update', (req, res) => {
	let accessToken = req.session.accessToken;
	let username = req.session.username;

	datahandler.proxyRetrieve(accessToken, (response) => {
		if (response.error) {
			res.status(502).send(response.error);
		} else if (response.statusCode !== 200) {
			res.status(response.statusCode).send(response.statusError);
		} else {
			datahandler.update(username, response.json);

			res.send(response.json);
		}
	});
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

/*
 *        datahandler.proxyRetrieve(accessToken, (response) => {
 *            if (response.error) {
 *                res.status(502).send(response.error);
 *            } else if (response.statusCode !== 200) {
 *                res.status(response.statusCode).send(response.statusError);
 *            } else {
 *                datahandler.update(username, response.json);
 *
 *                res.send(response.json);
 *            }
 *        });
 */
	}
});

module.exports = router;
