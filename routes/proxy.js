'use strict';

const express = require('express');
const router = express.Router();

const data = require('../data');
const Proxy = require('../controllers/proxy')

let proxy = new Proxy();

// proxy endpoints
router.get('/proxy/retrieve', (req, res, next) => {
});
