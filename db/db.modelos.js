//Importo los modulos necesarios
const {DataTypes, Model } = require('sequelize');
const sequelize = require('./db.conexion')

//Defino los modelos de DB que voy a utilizar

const Usuarios = sequelize.define('usuarios' , {
    nombres : {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    apellidos: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    email: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    usuario: {
        type: DataTypes.STRING(10),
        allowNull: false
    },
    pass : {
        type: DataTypes.STRING(15),
        allowNull: false
    }
}, {
    timestamps: false
})

module.exports = Usuarios