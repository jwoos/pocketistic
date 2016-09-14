'use strict';

const express = require('express');
const router = express.Router();

const proxy = require('../controllers/proxy');

// proxy endpoints
router.get('/retrieve', (req, res) => {
	let getData = req.query;
	let accessToken = req.session.accessToken;

	proxy.retrieve(accessToken, getData, (response) => {
		if (response.error) {
			res.status(502).send(response.error);
		} else if (response.statusCode !== 200) {
			res.status(response.statusCode).send(response.statusError);
		} else {
			res.send(response.json);
		}
	});
});

module.exports = router;
