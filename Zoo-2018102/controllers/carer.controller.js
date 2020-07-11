'use strict'

var Carer = require('../models/carer.model');

function login(req, res){
    var params = req.body;

    if(params.username && params.password){
        Carer.findOne({username: params.username, password: params.password}, (err, login)=>{
            if(err){
                res.status(500).send({message: 'Error general'});
            }else if(login){
                res.send({message: 'Bienvenido', user: login});
            }else{
                res.send({message: 'Error al logearse, usuario o contraseña incorrecta'});
            }
        }).populate('animals');
    }else{
        res.send({message: 'Ingresa los campos requeridos'});
    }
}

module.exports = {
    login
}