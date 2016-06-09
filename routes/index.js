'use strict';

const express = require('express');
const router = express.Router();

const Authenticator = require('../controllers/authentication.js');
const data = require('../data.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/authentication', (req, res, next) => {

	let authAgent = new Authenticator(data.consumerKey, '192.168.1.20:8080/home', '');

	authAgent.retrieveRequestToken((redirect) => {
		res.send(redirect);
	});
});

module.exports = router;
