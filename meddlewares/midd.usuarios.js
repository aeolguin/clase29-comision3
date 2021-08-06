//IMPORTO LOS MODULOS NECESARIOS
const cors = require('cors')
const rateLimit = require("express-rate-limit");
const servicesUsuarios = require('../services/services.usuarios')
const Joi = require('joi');
const { modelologin, modeloAlta } = require('./midd.modeloUsuarios');


//EXPORTO MODULOS DE SERVICIO
module.exports.corsOption = {
    origin : function (origin, callback) {
        if (process.env.listaBlanca.indexOf(origin) !== -1){
            callback(null, true)
        }else {
            callback(new Error('No autorizado por Cors'))
        }
    }
}

module.exports.limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 10, // limit each IP to 100 requests per windowMs
    message: 'Usted exedió el limite de accesos a la API'
  });

  module.exports.usuarioValido = async (req,res,next)=>{
    try {
        if (req.headers.authorization != undefined){
            const token = req.headers.authorization.split(' ')[1]
            let verificado = await servicesUsuarios.verificacionUsuario(token)
            console.log(verificado)
            req.params.usuario = verificado.data
            return next()
        }else{
            throw new Error ('Este es un sistema seguro y requiere autorización')
        }
    }catch (err){
        console.log(err.message)
        res.status(500).json({error: err.message})
    }
}

module.exports.chequeoLogin = async (req,res,next)=>{
    try {
        await Joi.attempt(req.body, modelologin, 'Alguno de los datos no es correcto')

            return next()
    }catch(error){
        console.log(error)
        res.status(500).json(error.message)
    }
}

module.exports.chequeoAlta = async (req,res,next)=>{
    
}

