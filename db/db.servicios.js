//Importo los modulos necesarios
const Usuarios = require('./db.modelos')
const sequelize = require('sequelize')

//Exporto los modulos

module.exports.usuarios = async ()=>{
    try {
        let resultado = await Usuarios.findAll()
        return resultado[0]
    }catch (err){
        console.log(err)
        throw new Error (err)
    }
}

module.exports.nuevoUsuario = async (usr)=> {
    console.log(usr)
    try {
        let resultado = await Usuarios.findOne({where:{apellidos: usr[1]}})
        console.log(resultado)
        //let resultado = await sequelize.query(`SELECT * FROM usuarios WHERE apellidos = ${usr[1]}`);
        if (resultado != null){
            return false
        }else {
            await Usuarios.create({nombres:usr[0], apellidos:usr[1],email:usr[2],usuario:usr[3],pass:usr[4]})
            //await sequelize.query(`INSERT INTO usuarios ('nombres', 'apellidos', 'email', 'usuario','pass') VALUES (?,?,?,?)`, 
            //{replacements: usr, type: sequelize.QueryTypes.SELECT})
            return true
        }
    }catch (err) {
        console.log(err)
        throw new Error (err)
    }
}

module.exports.existenciaDeUsuario = async (usr)=>{
    let usuario = [usr.usuario , usr.pass]
    try {
        let resultado = await Usuarios.findOne({where: {usuario: `${usuario[0]}`}})
        console.log(resultado)
        //let resultado = await sequelize.query(`SELECT * FROM dbo.usuarios WHERE usuarios.usuario = '${usuario[0]}'`);
        if (resultado != null) {
            //let chequeado = await sequelize.query(`SELECT * FROM usuarios WHERE usuarios.pass = '${usuario[1]}'`);
            let chequeado = await Usuarios.findOne({where: {pass: `${usuario[1]}`}})
            if (chequeado != null) {
                return true
            }else {
                return false
            }
        }else {
            return false
        }
    }catch (err) {
        console.log(err)
        throw new Error (err)
    }
}
