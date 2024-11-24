import { app } from '../index.js';
import request from 'supertest';
import { Usuario } from '../Models/Relaciones';
import nodemailer from 'nodemailer';

// Mock de nodemailer
jest.mock('nodemailer', () => {
  const originalModule = jest.requireActual('nodemailer');
  return {
    ...originalModule,
    createTransport: jest.fn(() => ({
      verify: jest.fn().mockResolvedValue(true), // Simula una respuesta exitosa
    })),
  };
});

const testPort = 4001;

describe('Pruebas para el endpoint /iniciarSesion', () => {
  let server;

  beforeAll(async () => {
    server = app.listen(testPort, () => {
      console.log('Servidor de prueba escuchando en el puerto 4001');
    });

    await Usuario.create({
      correo: 'andriuchg14@gmail.com',
      password: 'micontraseña',
      nombre: 'Andres',
      apellidoPaterno: 'ApellidoPaterno',
      apellidoMaterno: 'ApellidoMaterno',
      telefono: '1234567890',
      dni: '12345678',
    });
  });

  afterAll(async () => {
    await Usuario.destroy({
      where: {
        correo: 'andriuchg14@gmail.com',
      },
    });
    await server.close();
  });

  afterEach(async () => {
    // Elimina los usuarios creados en las pruebas para evitar efectos secundarios
    await Usuario.destroy({ where: {} });
  });

  it('Debe arrojar el código 400 si falta el correo o contraseña', async () => {
    const response = await request(app).post('/api/usuarios/iniciarSesion').send({});
    expect(response.statusCode).toBe(400);
    expect(response.body.message).toBe('Correo y contraseña son requeridos');
  });

  test('Debe devolver error 403 si la cuenta está inhabilitada', async () => {
    // Deshabilitar al usuario de prueba
    await Usuario.update({ estado: 'inhabilitado' }, {
      where: {
        correo: 'andriuchg14@gmail.com',
      },
    });

    const response = await request(app)
      .post('/api/usuarios/iniciarSesion')
      .send({
        correo: 'andriuchg14@gmail.com',
        password: 'micontraseña',
      });

    expect(response.status).toBe(403);
    expect(response.body.message).toBe('Cuenta inhabilitada');
  });

  test('Debe devolver error 401 si la contraseña no corresponde al usuario', async () => {
    const response = await request(app)
      .post('/api/usuarios/iniciarSesion')
      .send({
        correo: 'andriuchg14@gmail.com',
        password: 'contraseñaIncorrecta',
      });

    expect(response.status).toBe(401);
    expect(response.body.message).toBe('Contraseña incorrecta');
  });

  it("Debe devolver 400 si el correo tiene formato inválido", async () => {
    const response = await request(app)
      .post('/api/usuarios/iniciarSesion')
      .send({ correo: "correo_sin_formato", password: "mipassword" });

    expect(response.statusCode).toBe(400);
    expect(response.body.message).toBe("Formato de correo inválido");
  });

  it("Debe devolver 500 si ocurre un error inesperado", async () => {
    jest.spyOn(Usuario, 'findOne').mockRejectedValue(new Error("Error simulado en la base de datos"));

    const response = await request(app)
      .post('/api/usuarios/iniciarSesion')
      .send({ correo: "usuario@ejemplo.com", password: "mipassword" });

    expect(response.statusCode).toBe(500);
    expect(response.body.message).toBe("Error en el inicio de sesión");

    Usuario.findOne.mockRestore();
  });

  test('Debe iniciar sesión exitosamente y devolver el nombre del usuario si las credenciales son correctas', async () => {
    const response = await request(app)
      .post('/api/usuarios/iniciarSesion')
      .send({
        correo: 'andriuchg14@gmail.com',
        password: 'micontraseña',
      });

    expect(response.status).toBe(200);
    expect(response.body.nombre).toBe('Andres');
  });
});



/*
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

describe('Pruebas para el endpoint /registrar', ()=>{
    let server;
    beforeAll(async () =>{
        server = app.listen(testPort, () => {
            console.log('Servidor de prueba escuchando en el puerto 4001')
        });
    });

    afterAll(async () => {
        await server.close();
    });
    
    it("Debe retornar un código 400 si falta el campo 'nombre'", async () => {
        const response = await request(app).post('/api/usuarios/registrar').send({
            apellidoPaterno: "Perez",
            apellidoMaterno: "Lopez",
            password: "mipassword",
            correo: "correo@ejemplo.com",
            telefono: "987654321",
            dni: "12345678"
        });
        expect(response.statusCode).toBe(400);
        expect(response.body.message).toBe("El campo 'nombre' es requerido");
    });

    it("Debe retornar un código 400 si falta el campo 'correo'", async () => {
        const response = await request(app).post('/api/usuarios/registrar').send({
            nombre: "Andres",
            apellidoPaterno: "Perez",
            apellidoMaterno: "Lopez",
            password: "mipassword",
            telefono: "987654321",
            dni: "12345678"
        });
        expect(response.statusCode).toBe(400);
        expect(response.body.message).toBe("El campo 'correo' es requerido");
    });

    it("Debe retornar un código 400 si el 'correo' no tiene formato válido", async () => {
        const response = await request(app).post('/api/usuarios/registrar').send({
            nombre: "Andres",
            apellidoPaterno: "Perez",
            apellidoMaterno: "Lopez",
            password: "mipassword",
            correo: "correo_sin_arroba",
            telefono: "987654321",
            dni: "12345678"
        });
        expect(response.statusCode).toBe(400);
        expect(response.body.message).toBe("Formato de correo inválido");
    });

    it("Debe retornar un código 400 si el 'telefono' no tiene 9 dígitos", async () => {
        const response = await request(app).post('/api/usuarios/registrar').send({
            nombre: "Andres",
            apellidoPaterno: "Perez",
            apellidoMaterno: "Lopez",
            password: "mipassword",
            correo: "correo@ejemplo.com",
            telefono: "12345",
            dni: "12345678"
        });
        expect(response.statusCode).toBe(400);
        expect(response.body.message).toBe("El campo 'telefono' debe tener 9 dígitos");
    });

    it("Debe retornar un código 400 si el 'dni' no tiene 8 dígitos", async () => {
        const response = await request(app).post('/api/usuarios/registrar').send({
            nombre: "Andres",
            apellidoPaterno: "Perez",
            apellidoMaterno: "Lopez",
            password: "mipassword",
            correo: "correo@ejemplo.com",
            telefono: "987654321",
            dni: "1234"
        });
        expect(response.statusCode).toBe(400);
        expect(response.body.message).toBe("El campo 'dni' debe tener 8 dígitos");
    });

    it("Debe retornar el código 500 si ocurre un error al registrar al usuario", async () => {
        const response = await request(app).post('/api/usuarios/registrar').send({
            nombre: "Andres",
            apellidoPaterno: "Perez",
            apellidoMaterno: "Lopez",
            password: "mipassword",
            correo: "correo@ejemplo.com",
            telefono: "987654321",
            dni: "33221222" 
        });
        expect(response.statusCode).toBe(500);
        expect(response.body.error).toBe("Error al registrar usuario. Por favor, intenta nuevamente.");
    });
});

describe("Pruebas para el endpoint /restablecerContrasena", () => {
    let server;

    beforeAll(async () => {
        server = app.listen(testPort, () => {
            console.log("Servidor de prueba escuchando en el puerto 4001");
        });
    });

    afterAll(async () => {
        await server.close();
    });

    it("Debe retornar un código 200 y un mensaje de éxito si la contraseña se actualiza correctamente", async () => {
        // Mock para simular que el usuario existe
        const mockUser = { 
            correo: "correo@ejemplo.com",
            password: "contraseñaAnterior",
            save: jest.fn().mockResolvedValue(true)
        };
        jest.spyOn(Usuario, "findOne").mockResolvedValue(mockUser);

        const response = await request(app).put("/api/usuarios/restablecerContrasena").send({
            correo: "correo@ejemplo.com",
            password: "nuevaContraseña"
        });

        expect(response.statusCode).toBe(200);
        expect(response.body.message).toBe("Contraseña actualizada con éxito");

        // Verificar que la contraseña del usuario fue actualizada
        expect(mockUser.password).toBe("nuevaContraseña");

        // Restaurar el mock
        Usuario.findOne.mockRestore();
    });

    it("Debe retornar un código 404 y un mensaje si el correo no se encuentra", async () => {
        // Mock para simular que no se encuentra el usuario
        jest.spyOn(Usuario, "findOne").mockResolvedValue(null);

        const response = await request(app).put("/api/usuarios/restablecerContrasena").send({
            correo: "no_existe@ejemplo.com",
            password: "nuevaContraseña"
        });

        expect(response.statusCode).toBe(404);
        expect(response.body.message).toBe("Correo no encontrado");

        // Restaurar el mock
        Usuario.findOne.mockRestore();
    });

    it("Debe retornar un código 500 si ocurre un error en el servidor", async () => {
        // Mock para simular un error en el servidor
        jest.spyOn(Usuario, "findOne").mockImplementation(() => {
            throw new Error("Error simulado en el servidor");
        });

        const response = await request(app).put("/api/usuarios/restablecerContrasena").send({
            correo: "correo@ejemplo.com",
            password: "nuevaContraseña"
        });

        expect(response.statusCode).toBe(500);
        expect(response.body.message).toBe("Error en el servidor");

        // Restaurar el mock
        Usuario.findOne.mockRestore();
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