'use strict'

var express = require('express');
var carerController = require('../controllers/carer.controller');
var api = express.Router();

api.post('/login', carerController.login);

module.exports = api;