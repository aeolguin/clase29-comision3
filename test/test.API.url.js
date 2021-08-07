//Importamos los modulos que vamos a utilizar
const chai = require('chai')
const chaiHttp = require('chai-http')
const expect = require('chai').expect
const usuariosServicios = require('../services/services.usuarios')

//configuraciones globales
chai.use(chaiHttp)
const url = 'http://localhost:3000'

//Armamos el testeo que queremos hacer

describe('Testeamos el endpoint principal: ', ()=>{
    it('Que el estado de respuesta sea 200', (done)=>{
        chai.request(url)

        .get('/ping')
        .end((err,res)=>{
             expect(res).to.have.status(200)
             done()
        })
    })
    it('Nos deberia responder un pong', (done)=>{
        chai.request(url)

        .get('/ping')
        .end((err,res)=> {
            console.log(res.body)
            expect(res.body).to.be.equal('pong') //equal (string) - eql (arrays u objetos)
            done()
        })
    })
})

describe('Chequeamos nuestro endo-point de Login', ()=>{
    it('Chequeamos que el estatus sea un 200', (done)=>{
            chai.request(url)
    
            .post('/login')
            .send({
                usuario: 'molguin',
                pass: 'Martina2712'
            })
            .end((err,res)=>{
                 expect(res).to.have.status(200)
                 done()
            })
    })

    it('Chequeamos que el login devuelve un token', (done)=> {
        chai.request(url)

        .post('/login')
        .send({
            usuario: 'molguin',
            pass: 'Martina2712'
        })
        .end((err,res)=>{
            console.log(res.body)
            expect(res.body).to.have.property('token')
            done()
        })
    })
})

//{nombre:'xxxx', apellido:'zzzz', algundatomas: 'ppppp'} // expect(res.body).to.be.eql(variable) 