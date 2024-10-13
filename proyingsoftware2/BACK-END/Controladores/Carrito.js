import express from 'express';
import { Usuario, Carrito, ProductoCarrito, Producto, StockProducto } from '../Models/Relaciones.js';  // Asegúrate de importar StockProducto

const router = express.Router();

//usado
// Endpoint para crear un carrito para un usuario, si no existe
router.post('/crearCarritoSiNoExiste/:usuarioID', async (req, res) => {
    try {
        const { usuarioID } = req.params; // Obtener el usuarioID desde los parámetros de la URL

        // Buscar un carrito existente asociado al usuarioID
        let carrito = await Carrito.findOne({ where: { usuarioID: usuarioID } });

        if (!carrito) {
            // Si no existe el carrito, crear uno nuevo
            carrito = await Carrito.create({ usuarioID });
            return res.status(201).json({
                mensaje: 'Carrito creado exitosamente',
                carrito: carrito // Devolver el nuevo carrito con el ID y usuarioID
            });
        } else {
            // Si ya existe el carrito, devolver el carrito existente
            return res.status(200).json({
                mensaje: 'El carrito ya existe para este usuario',
                carrito: carrito
            });
        }
    
    } catch (error) {
        console.error('Error al crear o verificar el carrito:', error);
        res.status(500).json({ mensaje: 'Error interno del servidor' });
    }
});

//usado
router.post('/agregarProductoCarrito', async (req, res) => {
    try {
        const { productoID, carritoID, cantidad } = req.body;

        // Verificar que todos los campos están presentes
        if (!productoID || !carritoID || !cantidad) {
            return res.status(400).json({ mensaje: 'Todos los campos son obligatorios.' });
        }

        // Verificar que el carrito existe
        const carrito = await Carrito.findByPk(carritoID);
        if (!carrito) {
            return res.status(404).json({ mensaje: 'Carrito no encontrado.' });
        }

        // Verificar que el producto existe en StockProducto y obtener el precio
        const stockProducto = await StockProducto.findOne({ where: { productoID } });
        if (!stockProducto) {
            return res.status(404).json({ mensaje: 'Producto no encontrado en el stock.' });
        }

        const precio = stockProducto.precio;  // Obtener el precio desde StockProducto

        // Verificar que el precio no sea nulo
        if (!precio) {
            return res.status(400).json({ mensaje: 'El producto no tiene un precio válido.' });
        }

        // Verificar si el producto ya existe en el carrito
        const existingProduct = await ProductoCarrito.findOne({
            where: {
                productoID,
                carritoID
            }
        });

        if (existingProduct) {
            // Si el producto ya existe, actualizar la cantidad
            existingProduct.cantidad += cantidad; // Incrementar la cantidad
            await existingProduct.save();
            return res.status(200).json({
                mensaje: 'Cantidad actualizada en el carrito.',
                productoCarrito: existingProduct
            });
        } else {
            // Si no existe, agregarlo
            const productoCarrito = await ProductoCarrito.create({
                productoID,
                carritoID,
                cantidad,
                precio  // Pasar el precio obtenido del stock del producto
            });

            return res.status(201).json({
                mensaje: 'Producto agregado al carrito correctamente',
                productoCarrito
            });
        }

    } catch (error) {
        console.error('Error al agregar el producto al carrito:', error);
        res.status(500).json({
            mensaje: 'Error al agregar el producto al carrito. Por favor, intenta nuevamente más tarde.',
            detalles: error.message
        });
    }
});

//usado
router.get('/productos/:usuarioID', async (req, res) => {
    const { usuarioID } = req.params; // Obtenemos el usuarioID desde los parámetros
    const baseUrl = `http://localhost:4000/api/productos/`; // La URL base para las imágenes

    try {
        // Primero, buscamos el carrito asociado al usuarioID
        const carrito = await Carrito.findOne({ where: { usuarioID } });

        if (!carrito) {
            return res.status(404).json({ mensaje: 'Carrito no encontrado para este usuario.' });
        }

        // Buscamos los productos en ProductoCarrito que correspondan al carrito encontrado
        const productosCarrito = await ProductoCarrito.findAll({
            where: { carritoID: carrito.id }, // Usamos el ID del carrito encontrado
            include: [
                {
                    model: Producto,
                    include: [
                        {
                            model: StockProducto,
                            attributes: ['precio'], // Incluir el precio
                        }
                    ],
                    attributes: ['imageUrl', 'nombre'], // Obtener la imagen y el nombre del producto
                }
            ],
        });

        // Si no hay productos en el carrito
        if (productosCarrito.length === 0) {
            return res.status(404).json({ mensaje: 'No se encontraron productos en el carrito.' });
        }

        // Mapeamos los datos a la estructura deseada
        const respuesta = productosCarrito.map(item => ({
            productoID: item.productoID, // Incluimos la ID del producto
            imagen: item.Producto.imageUrl ? `${baseUrl}${item.Producto.imageUrl}` : null, // Construir la URL completa usando baseUrl
            nombre: item.Producto.nombre,
            precio: item.Producto.StockProducto.precio,
            cantidad: item.cantidad,
            subtotal: (item.Producto.StockProducto.precio * item.cantidad).toFixed(2), // Calcular subtotal
        }));

        res.status(200).json(respuesta);
    } catch (error) {
        console.error('Error al obtener los productos del carrito:', error);
        res.status(500).json({ mensaje: 'Error interno del servidor' });
    }
});

// En tu archivo de rutas de carrito.js Usandose
//usado
router.delete('/eliminarProducto/:usuarioID/:productoID', async (req, res) => {
    const { usuarioID, productoID } = req.params;

    try {
        // Encuentra el carrito del usuario
        const carrito = await Carrito.findOne({
            where: { usuarioID }
        });

        if (!carrito) {
            return res.status(404).json({ mensaje: 'Carrito no encontrado para el usuario.' });
        }

        // Busca el producto en el carrito
        const producto = await ProductoCarrito.findOne({
            where: {
                carritoID: carrito.id, // Usar el ID del carrito encontrado
                productoID // Busca por ID del producto
            }
        });

        if (!producto) {
            return res.status(404).json({ mensaje: 'Producto no encontrado en el carrito.' });
        }

        // Elimina el producto
        await ProductoCarrito.destroy({
            where: {
                id: producto.id, // Asegúrate de eliminar por ID
            }
        });

        res.status(200).json({ mensaje: 'Producto eliminado correctamente.' });
    } catch (error) {
        console.error('Error al eliminar el producto:', error);
        res.status(500).json({ mensaje: 'Error interno del servidor' });
    }
});

//usado para la imagen de carrito de compras
router.get('/cantidadProductos/:usuarioID', async (req, res) => {
    const { usuarioID } = req.params;

    try {
        // Buscar el carrito del usuario
        const carrito = await Carrito.findOne({ where: { usuarioID } });

        if (!carrito) {
            return res.status(404).json({ mensaje: 'Carrito no encontrado para este usuario.' });
        }

        // Obtener los productos del carrito
        const productosCarrito = await ProductoCarrito.findAll({ where: { carritoID: carrito.id } });

        // Calcular la cantidad total de productos
        const totalProductos = productosCarrito.reduce((total, producto) => total + producto.cantidad, 0);

        res.status(200).json({ totalProductos });
    } catch (error) {
        console.error('Error al obtener la cantidad de productos:', error);
        res.status(500).json({ mensaje: 'Error interno del servidor.' });
    }
});
//usado
router.put('/actualizarCantidad/:usuarioID/:productoID', async (req, res) => {
    const { usuarioID, productoID } = req.params; // Obtiene los IDs de los parámetros
    const { accion } = req.body; // Obtiene la acción desde el cuerpo de la solicitud (incrementar o decrementar)

    try {
        // Busca el carrito del usuario
        const carrito = await Carrito.findOne({ where: { usuarioID } });

        if (!carrito) {
            return res.status(404).json({ mensaje: 'Carrito no encontrado para este usuario.' });
        }

        // Busca el producto en el carrito
        const productoEnCarrito = await ProductoCarrito.findOne({
            where: {
                carritoID: carrito.id, // Usa el ID del carrito encontrado
                productoID
            }
        });

        if (!productoEnCarrito) {
            return res.status(404).json({ mensaje: 'Producto no encontrado en el carrito.' });
        }

        // Incrementa o decrementar la cantidad
        if (accion === 'incrementar') {
            productoEnCarrito.cantidad += 1;
        } else if (accion === 'decrementar') {
            // Evitar que la cantidad sea menor a 1
            if (productoEnCarrito.cantidad > 1) {
                productoEnCarrito.cantidad -= 1;
            } else {
                return res.status(400).json({ mensaje: 'La cantidad no puede ser menor a 1.' });
            }
        } else {
            return res.status(400).json({ mensaje: 'Acción no válida. Debe ser "incrementar" o "decrementar".' });
        }

        await productoEnCarrito.save();

        res.status(200).json({ mensaje: 'Cantidad actualizada correctamente.', nuevaCantidad: productoEnCarrito.cantidad });
    } catch (error) {
        console.error('Error al actualizar la cantidad:', error);
        res.status(500).json({ mensaje: 'Error interno del servidor.' });
    }
});






export default router;
