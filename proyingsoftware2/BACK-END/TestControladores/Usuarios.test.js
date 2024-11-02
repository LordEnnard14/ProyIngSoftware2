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

    it('Tiene que arrojar el código 400 si falta el correo o contraseña', async() =>{
        const response = await request(app).post('/api/usuarios/iniciarSesion').send({});
        expect(response.statusCode).toBe(400);
        expect(response.body.message).toBe('Correo y contraseña son requeridos');
    });

    it("Se tiene que mostrar el código 404 si no se encuentra al usuario en la base de datos de acuerdo al correo brindado", async() =>{
        const response = await request(app)
        .post('/api/usuarios/iniciarSesion')
        .send({correo: "correoinvalido@ejemplo.com", password: "contraseña000"});

        expect(response.statusCode).toBe(404);
        expect(response.body.message).toBe('Usuario no encontrado');
    });

    it("Se tiene que mostrar el codigo 401 si la contraseña no corresponde al usuario (correo)", async() => {
        const response = await request(app)
        .post('/api/usuarios/iniciarSesion')
        .send({correo: 'andriuchg14@gmail.com', password: 'contraseñaincorrecta'});

        expect(response.statusCode).toBe(401);
        expect(response.body.message).toBe('Contraseña incorrecta');
    });

    it("Debe iniciar sesion exitosamente y devolver el nombre del usuario si las credenciales son correctas", async () => {
        const response = await request(app)
        .post('/api/usuarios/iniciarSesion')
        .send({correo: 'andriuchg14@gmail.com', password: 'micontraseña'});

        expect(response.statusCode).toBe(200);
        expect(response.body.message).toBe('Inicio de sesión exitoso');
        expect(response.body.user).toHaveProperty("id");
        expect(response.body.user).toHaveProperty("nombre", "Andres");
        expect(response.body.user).toHaveProperty("apellidoPaterno","Churampi");
        expect(response.body.user).toHaveProperty("apellidoMaterno","Guerrero");
        expect(response.body.user).toHaveProperty("correo", "andriuchg14@gmail.com");
    });
});

describe('Pruebas para el endpoint /verificarCorreo/:correo', () => {

    let server;
    beforeAll(async () => {
        server = app.listen(testPort, () => {
            console.log('Servidor de prueba escuchando en el puerto 4001');
        });
    });

    afterAll(async () => {
        await server.close();
    });

    it("Debe devolver el código 200 y el mensaje 'El correo existe' si el correo está en la base de datos", async () => {
        const response = await request(app)
            .get('/api/usuarios/verificarCorreo/andriuchg14@gmail.com');

        expect(response.statusCode).toBe(200);
        expect(response.body.message).toBe('El correo existe');
    });

    it("Debe devolver 404 y el mensaje 'El correo no existe' si el correo no está en la base de datos", async () => {
        const response = await request(app)
            .get('/api/usuarios/verificarCorreo/correoinvalido@ejemplo.com');

        expect(response.statusCode).toBe(404);
        expect(response.body.message).toBe('El correo no existe');
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