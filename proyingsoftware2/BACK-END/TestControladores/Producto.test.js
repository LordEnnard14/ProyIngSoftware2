import {app} from '../index.js';
import request from 'supertest';
import {ProductoDetalle} from '../Models/Relaciones';

const testPort = 4001;

describe('Pruebas para el endpoint /ProductosAll', () => {
    let server;

    beforeAll(async () => {
        server = app.listen(testPort, () => {
            console.log(`Servidor de prueba escuchando en el puerto ${testPort}`);
        });
    });

    afterAll(async () => {
        await server.close();
    });

    it('Debe devolver el código 200 y una lista de productos con sus detalles asociados', async () => {
        const response = await request(app).get('/api/productoDetalle/ProductosAll');
    
        // Mostrar los datos completos de la respuesta en la consola
        //console.log("ProductosDetalles Response:", JSON.stringify(response.body, null, 2));
    
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('ProductosDetalles');
        expect(Array.isArray(response.body.ProductosDetalles)).toBe(true);
    
        if (response.body.ProductosDetalles.length > 0) {
            const producto = response.body.ProductosDetalles[0];
            expect(producto).toHaveProperty('Producto');
            expect(producto.Producto).toHaveProperty('nombre');
            expect(producto.Producto).toHaveProperty('Marca');
            expect(producto.Producto.Marca).toHaveProperty('nombre');
            expect(producto).toHaveProperty('Botica');
            expect(producto.Botica).toHaveProperty('nombre');
            expect(producto.Botica).toHaveProperty('direccion');
        }
    });

    it('Debe devolver el código 500 si ocurre un error en el servidor', async () => {
        
        jest.spyOn(ProductoDetalle, 'findAll').mockRejectedValue(new Error('Error simulado'));

        const response = await request(app).get('/api/productoDetalle/ProductosAll');

        expect(response.statusCode).toBe(500);
        expect(response.body).toHaveProperty('error', 'Error simulado');
        
        
        ProductoDetalle.findAll.mockRestore();
    });
});

describe('Pruebas para el endpoint /searchProductos', () => {
    let server;

    beforeAll(async () => {
        server = app.listen(4001, () => {
            console.log('Servidor de prueba escuchando en el puerto 4001');
        });
    });

    afterAll(async () => {
        await server.close();
    });

    it('Debe devolver productos cuando se busca un nombre existente', async () => {
        const response = await request(app).get('/api/productoDetalle/searchProductos?nombreProducto=Paracetamol');

        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('ProductosDetalles');
        expect(Array.isArray(response.body.ProductosDetalles)).toBe(true);
        expect(response.body.ProductosDetalles.length).toBeGreaterThan(0); 

        // Verifica que los productos tengan la estructura esperada
        const producto = response.body.ProductosDetalles[0];
        console.log('Producto encontrado:', producto); // Log del producto encontrado
        expect(producto).toHaveProperty('Producto');
        expect(producto.Producto.nombre).toContain('Para'); 
        expect(producto).toHaveProperty('Botica');
        expect(producto.Botica).toHaveProperty('nombre');
        expect(producto.Botica).toHaveProperty('direccion');
    });

    it('Debe devolver un mensaje 404 si no se encuentra ningún producto', async () => {
        const response = await request(app).get('/api/productoDetalle/searchProductos?nombreProducto=Cenicienta');

       // console.log('Búsqueda con nombre no existente:', response.body); 
        expect(response.statusCode).toBe(404);
        expect(response.body).toHaveProperty('message', 'No se encontró ningún producto con el término "Cenicienta"');
    });

    it('Debe devolver todos los productos si no se proporciona un nombre', async () => {
        const response = await request(app).get('/api/productoDetalle/searchProductos');

       // console.log('Búsqueda sin término:', response.body); 
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('ProductosDetalles');
        expect(Array.isArray(response.body.ProductosDetalles)).toBe(true);
        expect(response.body.ProductosDetalles.length).toBeGreaterThan(0); 
    });
});

