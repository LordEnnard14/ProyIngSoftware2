import {app} from '../index.js';

import request from 'supertest';

const testPort = 4001;


describe('Pruebas para el endpoint /iniciarSesion', () => {

    let server;
    beforeAll(async () =>{
        server = app.listen(testPort, () => {
            console.log('Servidor de prueba escuchando en el puerto 4001')
        });
    });

    afterAll(async () => {
        await server.close();
    });

    it('Tiene que arrojar el mensaje numero 400 si falta el correo o contraseña', async() =>{
        const response = await request(app).post('/api/usuarios/iniciarSesion').send({});
        expect(response.statusCode).toBe(400);
        expect(response.body.message).toBe('Correo y contraseña son requeridos');
    });

    
});



/**
 * He creado .babelrc
 * He creado el jest.config.js
 * He ejecutado esto npm install --save-dev jest supertest cross-env
 * He ejecutado esto npm install --save-dev @babel/preset-env babel-jest
 * He ejecutado esto npm install --save-dev cross-env
 * 
 */