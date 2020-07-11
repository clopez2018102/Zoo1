'use strict'

var Animal = require('../models/animal.model');
var Carer = require('../models/carer.model');

function saveAnimal(req, res){
    var animal = new Animal();
    var params = req.body;

    if(params.name && 
        params.age && 
        params.scientificName){
        
        animal.name = params.name;
        animal.age = params.age;
        animal.typeAnimal = params.typeAnimal;
        animal.scientificName = params.scientificName;

        animal.save((err, animalSaved)=>{
            if(err){
                res.status(500).send({message: 'Error general', err});
            }else if(animalSaved){
                res.send({animal: animalSaved});
            }else{
                res.status(418).send({message: 'Error al guardar'});
            }
        });
    }else{
        res.status(200).send({message: 'Ingrese todos los datos'});
    }
}

function listAnimals(req, res){
    Animal.find({}, (err, animals)=>{
        if(err){
            res.status(500).send({message:'Error general'});
        }else if(animals){
            res.send({animals: animals});
        }else{
            res.status(418).send({message: 'No se pueden mostrar datos'});
        }
    });
}

function searchAnimal(req, res){
    var params = req.body;
    if(params.search){
        Animal.find({$or:[{name: params.search},
                        {typeAnimal: params.search},
                        {scientificName: params.search}]}, (err, animalFind)=>{
                            if(err){
                                res.status(500).send({message: 'Error general'});
                            }else if(animalFind){
                                res.send({message:'Coincidencias encontradas', animal: animalFind});
                            }else{
                                res.status(418).send({message: 'Sin coincidencias'});
                            }
                        });
    }else{
        res.send({message: 'Ingresa el campo de busqueda'});
    }
}

function saveCarer(req, res){
    var carer = new Carer();
    var params = req.body;

    if(params.name && 
        params.username && 
        params.job && 
        params.password &&
        params.animals){
            Carer.findOne({username: params.username}, (err, carerFind)=>{
                if(err){
                    res.status(500).send({message: 'Error general'});
                }else if(carerFind){
                    res.send({message: 'Usuario ya existente'});
                }else{
                    carer.name = params.name;
                    carer.lastname = params.lastname;
                    carer.username = params.username;
                    carer.password = params.password;
                    carer.job = params.job;
                    carer.animals = params.animals;

                    carer.save((err, carerSaved)=>{
                        if(err){
                            res.status(500).send({message: 'Error general al guardar'});
                        }else if(carerSaved){
                            res.send({message: 'Cuidador guardado con éxito', carer: carerSaved});
                        }else{
                            res.status(418).send({message: 'Error al guardar'});
                        }
                    });
                }
            });

    }else{
        res.send({message: 'Ingresa todos los campos'});
    }
}

function listCarers(req, res){
    Carer.find({}, (err, carers)=>{
        if(err){
            res.status(500).send({message: 'Error general'});
        }else if(carers){
            res.send({carers: carers});
        }else{
            res.send({message: 'Sin registros'});
        }
    }).populate('animals');
}

function searchCarer(req, res){
    var params = req.body;

    if(params.search){
        Carer.find({$or:[{name: params.search}, {job: params.search}]}, (err, carerFind)=>{
            if(err){
                res.status(500).send({message: 'Error general'});
            }else if(carerFind){
                res.send({carers: carerFind});
            }else{
                res.send({message: 'Sin registros'});
            }
        }).populate('animals');
    }else{
        res.send({message: 'Ingresa el campo de busqueda'});
    }
}

module.exports = {
    saveAnimal,
    listAnimals,
    searchAnimal,
    saveCarer,
    listCarers,
    searchCarer
}