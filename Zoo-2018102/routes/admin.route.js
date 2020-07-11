'use strict'

var express = require('express');
var adminController = require('../controllers/admin.controller');
var api = express.Router();

api.post('/saveAnimal', adminController.saveAnimal);
api.get('/listAnimals', adminController.listAnimals);
api.post('/searchAnimal', adminController.searchAnimal);

/* Rutas para cuidador */

api.post('/saveCarer', adminController.saveCarer);
api.get('/listCarers', adminController.listCarers);
api.post('/searchCarer', adminController.searchCarer);

module.exports = api;