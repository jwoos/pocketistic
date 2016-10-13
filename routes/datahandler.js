'use strict';

const express = require('express');
const router = express.Router();

const proxy = require('../controllers/proxy');
const datahandler = require('../controllers/datahandler');

// proxy endpoints
router.get('/retrieve', (req, res) => {
	let getData = req.query;
	let accessToken = req.session.accessToken;
	let username = req.session.username;

	proxy.retrieve(accessToken, getData, (response) => {
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

router.get('/update', (req, res) => {});

module.exports = router;
