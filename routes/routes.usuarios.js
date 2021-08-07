//Importo los modulos necesarios
const midd = require('../meddlewares/midd.usuarios')
const servicesUsuarios = require('../services/services.usuarios')
const cors = require('cors')

//Exportamos nuestros modulos

module.exports = async (app)=> {
    app.get('/ping', (req,res)=>{
        //Si llegamos hasta aca devolvemos el pong
        try{
            res.status(200).json('pong')
        }catch (err) {
            console.log(err)
            res.status(500).json('Algo raro paso en este ping pong')
        }
    })
    
    app.post('/nuevousuario', async (req,res)=>{
        let usuario = req.body
        try{

            let resultado = servicesUsuarios.crearUsuarios(usuario)
            res.status(200).json('Usuario creado correctamente')
            //res.json(resultado)

        }catch(err){
            console.log(err)
            res.status(400).send('Ocurrio un error inesperado')  
        }
    })

    app.post('/login', midd.chequeoLogin, async (req,res)=>{
        let usuario = req.body
        console.log(usuario)
        try {
            let resultado = await servicesUsuarios.chequearUsrValido(usuario)
            if (resultado) {
                let validacion = await servicesUsuarios.generaToken(usuario)
                res.json({token: validacion})
            }
        }catch (err){
            console.log(err)
            res.status(400).send('Usuario no registrado')
        }
    })

    app.get('/usuarios' , async (req,res)=>{
        const token = req.headers.authorization.split(' ')[1]
        try {
            let resultado = await servicesUsuarios.verificacionUsuario(token)
            res.status(200).json(resultado)
        }catch(error) {
            console.log(error)
            res.status(400).send('algo raro paso')
        }
    })

}