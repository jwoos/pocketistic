'use strict';

const express = require('express');
const router = express.Router();

const data = require('../data');
const Proxy = require('../controllers/proxy');

let proxy = new Proxy();

// proxy endpoints
router.get('/retrieve', (req, res, next) => {
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
