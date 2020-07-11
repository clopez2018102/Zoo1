'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var animalSchema = Schema({
    name: String,
    age: Number,
    typeAnimal: String,
    scientificName: String
});

module.exports = mongoose.model('animal', animalSchema);