//Importamos los modulos que necesitamos.
const dbServicios = require('../db/db.servicios')
const jwt = require('jsonwebtoken')

//Exportamos nuestros modulos
module.exports.crearUsuarios = async (usuario)=> {
    let usrNuevo = [
        usuario.nombres,
        usuario.apellidos,
        usuario.email,
        usuario.usuario,
        usuario.pass
    ]
    try {
        let resultado = await dbServicios.nuevoUsuario(usrNuevo)
        if (resultado) {
            return 'Alta de usuario correcta'
        }else {
            
            throw new Error ('Error en la creacion del usuario o el usuario ya existe')
        }

    }catch (err) {
        console.log(err)
        throw new Error ('Error en la creacion del usuario')
    }
}

module.exports.generaToken = async (data)=> {
    const resultado = jwt.sign({
        data} , ''+process.env.SECRET_KEY
    ) //Tiempo maximo 15 minutos de validez
    console.log(resultado.length)
    return resultado
}

module.exports.verificacionUsuario = async (token)=> {
    const resultado = jwt.verify(token, process.env.SECRET_KEY)

    if(resultado){
        return resultado
    }else {
        throw new Error ('Token no valido!')
    }
}

module.exports.chequearUsrValido = async (usr)=>{
    try {
        let resultado = await dbServicios.existenciaDeUsuario (usr)
        console.log(resultado)
        if (resultado) {
            return resultado
        }else {
            throw new Error ('No existe el Usuario')
        }
    }catch (err) {
        console.log(err)
        throw new Error (err)
    }
}