
//Importar los modulos necesarios
const expect = require('chai').expect
const usuariosServicios = require('../services/services.usuarios')

//Declarar los testeos que vamos a realizar

describe('Chequeando creacion de token con jwt - Chai-expect', ()=> {
    describe('chequeo utilizando Mocha y Hcai - Describe', ()=> {
        it('Generacion de string token con jwt', async ()=> {
            let usuario = {
                usuario: 'molguin',
                pass: 'Martina2712'
            }
            let result = await usuariosServicios.generaToken(usuario);
            expect(result).to.be.a('string')
        });
        it('Probamos que nuestro token tiene 165 caracteres', async ()=> {
            let usuario = {
                usuario: 'molguin',
                pass: 'Martina2712'
            }
            result = await usuariosServicios.generaToken(usuario);
            expect(result).to.have.lengthOf(172)
        })
    })
})

//Testing de mis url
//url - del tipo get - devolcer un ok.