import { app } from '../index.js';
import request from 'supertest';
import { Usuario } from '../Models/Relaciones';
import NodeCache from "node-cache";
import Transporter from "../Services/mail.service";

jest.mock('../Models/Relaciones');
jest.mock('../Services/mail.service');

// Mock para node-cache
jest.mock("node-cache", () => {
  return jest.fn().mockImplementation(() => ({
    set: jest.fn(),
    get: jest.fn(),
  }));
});

describe("Pruebas para el endpoint /registrar", () => {
  let server;
  let cacheMock;
  beforeAll(() => {
    server = app.listen(4001, () => {
      console.log('Servidor de prueba escuchando en el puerto 4001');
    });
  });

  afterAll((done) => {
    server.close(done);
  });

  beforeAll(() => {
    // Configuramos el mock de NodeCache
    cacheMock = {
      set: jest.fn(),
      get: jest.fn(),
    };
    NodeCache.mockImplementation(() => cacheMock);
  });

  it("Debe enviar un código de verificación al correo y almacenar en caché", async () => {
    // Mock del envío de correos
    Transporter.sendMail.mockImplementation((mailOptions, callback) => {
      callback(null, { response: "Correo enviado con éxito" });
    });

    const datosUsuario = {
      nombre: "Andres",
      apellidoPaterno: "Churampi",
      apellidoMaterno: "Guerrero",
      password: "12345678",
      correo: "andriuchg14@gmail.com",
      telefono: "914638283",
      dni: "71747493",
    };

    const response = await request(app).post("/api/usuarios/registrar").send(datosUsuario);
    console.log("Respuesta del servidor:", response.body);
    expect(response.status).toBe(201);
    expect(response.body.message).toBe("Se ha enviado un código de verificación a tu correo");
    expect(Transporter.sendMail).toHaveBeenCalledTimes(1); // Verifica que se envió el correo una vez
    expect(cacheMock.set).toHaveBeenCalledWith(datosUsuario.correo, expect.any(String)); // Verifica que el código fue almacenado
  });

  it("debería retornar un error si falta un campo requerido", async () => {
    const datosIncompletos = {
      apellidoPaterno: "Pérez",
      correo: "juan.perez@example.com",
      telefono: "987654321",
      dni: "12345678",
    };

    const response = await request(app).post("/api/usuarios/registrar").send(datosIncompletos);

    expect(response.status).toBe(404);
    expect(response.body.message).toBe("El campo 'nombre' es requerido");
  });

  it("debería retornar un error si el correo tiene formato inválido", async () => {
    const datosUsuario = {
      nombre: "Juan",
      apellidoPaterno: "Pérez",
      apellidoMaterno: "García",
      password: "123456",
      correo: "correo_invalido",
      telefono: "987654321",
      dni: "12345678",
    };

    const response = await request(app).post("/api/usuarios/registrar").send(datosUsuario);

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Formato de correo inválido");
  });

  it("debería retornar un error si el teléfono no tiene 9 dígitos", async () => {
    const datosUsuario = {
      nombre: "Juan",
      apellidoPaterno: "Pérez",
      apellidoMaterno: "García",
      password: "123456",
      correo: "juan.perez@example.com",
      telefono: "12345",
      dni: "12345678",
    };

    const response = await request(app).post("/api/usuarios/registrar").send(datosUsuario);

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("El campo 'telefono' debe tener 9 dígitos");
  });

  it("debería retornar un error si ocurre un problema con el envío de correos", async () => {
    // Mockeamos un error en el envío de correos
    Transporter.sendMail.mockImplementation((mailOptions, callback) => {
      callback(new Error("Error al enviar el correo"));
    });

    const datosUsuario = {
      nombre: "Juan",
      apellidoPaterno: "Pérez",
      apellidoMaterno: "García",
      password: "123456",
      correo: "juan.perez@example.com",
      telefono: "987654321",
      dni: "12345678",
    };

    const response = await request(app).post("/api/usuarios/registrar").send(datosUsuario);

    expect(response.status).toBe(500);
    expect(response.body.message).toBe("Error al enviar el correo de verificación");
  });

  it("debería retornar un error 500 si ocurre un problema inesperado", async () => {
    const datosUsuario = {
      nombre: "Juan",
      apellidoPaterno: "Pérez",
      apellidoMaterno: "García",
      password: "123456",
      correo: "juan.perez@example.com",
      telefono: "987654321",
      dni: "12345678",
    };

    Usuario.create.mockImplementation(() => {
      throw new Error("Error inesperado");
    });

    const response = await request(app).post("/api/usuarios/registrar").send(datosUsuario);

    expect(response.status).toBe(500);
    expect(response.body.error).toBe("Error al registrar usuario. Por favor, intenta nuevamente.");
  });

});

//Este esta cerrado
describe("Pruebas para el endpoint /iniciarSesion", () => {
  let server;

  beforeAll(() => {
    server = app.listen(4001, () => {
      console.log('Servidor de prueba escuchando en el puerto 4001');
    });
  });
  beforeEach(() => {
    Usuario.findOne.mockReset();
  });

  afterAll((done) => {

    server.close(done);
  });

  it("Debe iniciar sesión exitosamente con credenciales correctas", async () => {
    // Mock del usuario válido
    const mockUsuario = {
      id: 1,
      nombre: "Juan",
      apellidoPaterno: "Pérez",
      apellidoMaterno: "López",
      correo: "juan@example.com",
      password: "123456",
      estado: true,
    };

    // Configurar el mock del modelo
    Usuario.findOne.mockResolvedValue(mockUsuario);

    const response = await request(app)
      .post("/api/usuarios/iniciarSesion")
      .send({ correo: "juan@example.com", password: "123456" });

    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Inicio de sesión exitoso");
    expect(response.body.user).toMatchObject({
      id: mockUsuario.id,
      nombre: mockUsuario.nombre,
      apellidoPaterno: mockUsuario.apellidoPaterno,
      apellidoMaterno: mockUsuario.apellidoMaterno,
      correo: mockUsuario.correo,
    });
  });

  it("Debe devolver un error si el usuario no existe", async () => {
    Usuario.findOne.mockResolvedValue(null);

    const response = await request(app)
      .post("/api/usuarios/iniciarSesion")
      .send({ correo: "noexiste@example.com", password: "123456" });

    expect(response.status).toBe(404);
    expect(response.body.message).toBe("Usuario no encontrado");
  });

  it("Debe devolver un error si la cuenta está inhabilitada", async () => {
    const mockUsuario = {
      id: 1,
      nombre: "Juan",
      apellidoPaterno: "Pérez",
      apellidoMaterno: "López",
      correo: "juan@example.com",
      password: "123456",
      estado: false,
    };

    Usuario.findOne.mockResolvedValue(mockUsuario);

    const response = await request(app)
      .post("/api/usuarios/iniciarSesion")
      .send({ correo: "juan@example.com", password: "123456" });

    expect(response.status).toBe(403);
    expect(response.body.message).toBe("Su cuenta ha sido inhabilitada. Por favor, contacte al soporte.");
  });

  it("Debe devolver un error si la contraseña es incorrecta", async () => {
    const mockUsuario = {
      id: 1,
      nombre: "Juan",
      apellidoPaterno: "Pérez",
      apellidoMaterno: "López",
      correo: "juan@example.com",
      password: "123456",
      estado: true,
    };

    Usuario.findOne.mockResolvedValue(mockUsuario);

    const response = await request(app)
      .post("/api/usuarios/iniciarSesion")
      .send({ correo: "juan@example.com", password: "incorrecta" });

    expect(response.status).toBe(401);
    expect(response.body.message).toBe("Contraseña incorrecta");
  });

  it("Debe devolver un error si faltan campos requeridos", async () => {
    const response = await request(app)
      .post("/api/usuarios/iniciarSesion")
      .send({ correo: "" }); // Sin contraseña
  
    expect(response.status).toBe(400); 
    expect(response.body.message).toBe("Correo y contraseña son requeridos");
  });

  it("Debe devolver un error si el formato del correo es inválido", async () => {
    const response = await request(app)
      .post("/api/usuarios/iniciarSesion")
      .send({ correo: "correo_invalido", password: "123456" });
  
    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Formato de correo inválido");
  });
  
});



/*


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
*/

/**
 * He creado .babelrc
 * He creado el jest.config.js
 * He ejecutado esto npm install --save-dev jest supertest cross-env
 * He ejecutado esto npm install --save-dev @babel/preset-env babel-jest
 * He ejecutado esto npm install --save-dev cross-env
 * 
 **/