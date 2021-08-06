const Joi = require('joi')

//Exporto el modelo
module.exports = {
    modelologin : Joi.object().keys({
        usuario: Joi.string().alphanum().min(6).max(16).required(), 
        pass: Joi.string().regex(/^[a-zA-Z0-9]{6,16}$/).min(6).required() //utilizo expresiones regulares
    }).with('usuario', 'pass'),// Si existe pass tb debe existir el usuario

    modeloAlta : Joi.object().keys({
        nombres: Joi.string().alphanum().min(6).max(50),
        apellidos: Joi.string().alphanum().min(6).max(50).required(),
        email: Joi.string().email().required(),
        usuario: Joi.string().alphanum().min(6).max(16).required(),
        pass: Joi.string().regex(/^[a-zA-Z0-9]{6,16}$/).min(6).required() //utilizo expresiones regulares
    })
}