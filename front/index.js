//Declaracion de la Clase para trabajar
class Usuario {
    constructor (usuario, pass){
        this.usuario = usuario,
        this.pass = pass,
        this.token = ""
    }

    static async guardaUsuario (usuario) {
        localStorage.setItem("datosUsuario", JSON.stringify(usuario))
    }

    static async recuperaUsuario () {
        let resultado = await JSON.parse(localStorage.getItem('datosUsuario'))
        return resultado
    }
}

//Instanciamos la clase para trabajar con usuario
Usuario.guardaUsuario(new Usuario ('molguin', 'Martina2712'))


//Logica de la pagina - aca hacemos el login
let login = async function (){
    let data = await Usuario.recuperaUsuario()
    //console.log(data)

    let resultado = await fetch("http://localhost:3000/login", {
        method: 'post',
        headers: {
            "Accept": "application/json, text/plain, */*",
            'Content-Type': 'application/json',
        },
        body: JSON.stringify( {
            "usuario": data.usuario,
            "pass" : data.pass
        })
    })
    
    let vuelta = await resultado.json()
    data.token = vuelta
    return data
}

async function llamda () {
    let resultado = await login()
    console.log(resultado)
    Usuario.guardaUsuario(resultado)
    return resultado
}



//Logica de la pagina -- Una vez realizado el login, hacemos una llamada recuperando datos
let usuarios = async function (){
    let data = await Usuario.recuperaUsuario()

    let resultado = await fetch("http://localhost:3000/usuarios", {
        method: 'get',
        headers: {
            "Accept": "application/json, text/plain, */*",
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${data.token}`
        },
    })
    
    let vuelta = resultado.json()
    return vuelta
}


async function llamadaNueva () {
    let resultado = await usuarios()
    console.log(resultado)
    return resultado
}

//Inicio de nuestra app
async function inicioApp () {
    await llamda();
    llamadaNueva()
}

inicioApp()


