//aqui se realiza la paga
import express from "express"; 
import { Orden, Usuario,ProductoOrden ,Carrito, ProductoCarrito, Producto,ProductoDetalle } from '../Models/Relaciones.js';  // Asegúrate de importar StockProducto

const router = express.Router();
const TASA_IMPUESTO = 0.18;  // Representa el 18% de impuestos

router.get('/:usuarioID', async (req, res) => {
    const { usuarioID } = req.params;
    const baseUrl = `http://localhost:4000/images/`;  // Cambia esto si tienes otra ruta de acceso a las imágenes

    try {
        // Buscar el carrito asociado al usuarioID
        const carrito = await Carrito.findOne({ where: { usuarioID } });

        if (!carrito) {
            return res.status(404).json({ mensaje: 'Carrito no encontrado para este usuario.' });
        }

        const carritoID = carrito.id;

        // Buscar los productos en ProductoCarrito que correspondan al carrito
        const productosCarrito = await ProductoCarrito.findAll({
            where: { carritoID },
            attributes: ['cantidad'],
            include: [
                {
                    model: ProductoDetalle,
                    attributes: ['precio', 'imageUrl'], // Obtener el precio e imagen desde ProductoDetalle
                    include: {
                        model: Producto,
                        attributes: ['nombre']  // Obtener el nombre del producto
                    }
                }
            ]
        });

        if (productosCarrito.length === 0) {
            return res.status(404).json({ mensaje: 'No se encontraron productos en el carrito.' });
        }

        // Mapeamos los datos (nombre, precio, cantidad y imagen)
        const productos = productosCarrito.map(item => ({
            nombre: item.ProductoDetalle.Producto.nombre,
            precio: item.ProductoDetalle.precio,
            cantidad: item.cantidad,
        }));

        // Devolver los productos con nombre, precio, cantidad e imagen
        res.status(200).json(productos);
    } catch (error) {
        console.error('Error al obtener los productos del carrito:', error);
        res.status(500).json({ mensaje: 'Error interno del servidor', detalles: error.message });
    }
});

  

router.post('/crearOrden/:usuarioID', async (req, res) => {
    const { usuarioID } = req.params;
    const { direccionEnvio, metodoEntrega, botica } = req.body;

    try {
        // Verificar si el usuario existe
        const usuario = await Usuario.findByPk(usuarioID);
        if (!usuario) {
            return res.status(404).json({ mensaje: 'Usuario no encontrado.' });
        }

        // Buscar el carrito del usuario
        const carrito = await Carrito.findOne({ where: { usuarioID } });
        if (!carrito) {
            return res.status(404).json({ mensaje: 'Carrito no encontrado.' });
        }

        // Obtener los productos del carrito
        const productosCarrito = await ProductoCarrito.findAll({
            where: { carritoID: carrito.id },
            include: [
                {
                    model: ProductoDetalle,
                    attributes: ['precio'],
                    include: {
                        model: Producto,
                        attributes: ['nombre']
                    }
                }
            ]
        });

        // Calcular el subtotal
        const subtotal = productosCarrito.reduce((total, item) => {
            return total + item.ProductoDetalle.precio * item.cantidad;
        }, 0);

        // Determinar el costo de envío
        const costoEnvio = metodoEntrega === 'entrega' ? 10 : 0;

        // Calcular el impuesto (18%)
        const impuesto = (subtotal + costoEnvio) * TASA_IMPUESTO;
        const impuestoFinal = isNaN(impuesto) ? 0 : impuesto.toFixed(2);

        // Calcular el total
        const total = subtotal + costoEnvio + parseFloat(impuestoFinal);

        // Determinar la dirección final según el método de entrega
        const direccionFinal = metodoEntrega === 'recojo' ? `Recojo en ${botica}` : direccionEnvio;

        // Validación de campos requeridos
        if (metodoEntrega === 'entrega' && !direccionEnvio) {
            return res.status(400).json({ mensaje: 'Debe proporcionar una dirección para la entrega a domicilio.' });
        }

        if (metodoEntrega === 'recojo' && !botica) {
            return res.status(400).json({ mensaje: 'Debe seleccionar una botica para el recojo en tienda.' });
        }

        // Crear la nueva orden en la base de datos, sin llenar ProductoOrden
        const nuevaOrden = await Orden.create({
            estado: 'pendiente',
            direccionEnvio: direccionFinal,
            subtotal: subtotal.toFixed(2),
            costoEnvio: costoEnvio.toFixed(2),
            impuestos: impuestoFinal,
            total: total.toFixed(2),
            usuarioID: usuarioID,
        });

        res.status(201).json({
            mensaje: 'Orden creada exitosamente. Use /llenarProductoOrden para añadir productos.',
            orden: nuevaOrden,
        });
    } catch (error) {
        console.error('Error al crear la orden:', error);
        res.status(500).json({ mensaje: 'Error al crear la orden.', detalles: error.message });
    }
});



router.post('/llenarProductoOrden/:usuarioID/:ordenID', async (req, res) => {
    const { usuarioID, ordenID } = req.params;

    try {
        // Buscar el carrito del usuario
        const carrito = await Carrito.findOne({ where: { usuarioID } });
        if (!carrito) {
            return res.status(404).json({ mensaje: 'Carrito no encontrado para este usuario.' });
        }

        // Obtener los productos del carrito del usuario
        const productosCarrito = await ProductoCarrito.findAll({
            where: { carritoID: carrito.id },
            include: [
                {
                    model: ProductoDetalle,
                    attributes: ['precio'],
                    include: {
                        model: Producto,
                        attributes: ['nombre']
                    }
                }
            ]
        });

        if (productosCarrito.length === 0) {
            return res.status(404).json({ mensaje: 'No se encontraron productos en el carrito.' });
        }

        // Iterar sobre los productos del carrito y llenar la tabla ProductoOrden
        for (const item of productosCarrito) {
            const precioTotal = item.ProductoDetalle.precio * item.cantidad;

            await ProductoOrden.create({
                ordenID: ordenID,
                productoDetalleID: item.productoDetalleID,
                cantidad: item.cantidad,
                precio: item.ProductoDetalle.precio.toFixed(2),
                precioTotal: precioTotal.toFixed(2)
            });
        }

        res.status(201).json({ mensaje: 'ProductoOrden llenado con éxito.' });
    } catch (error) {
        console.error('Error al llenar ProductoOrden:', error);
        res.status(500).json({ mensaje: 'Error interno del servidor al llenar ProductoOrden.', detalles: error.message });
    }
});



router.put('/actualizarStockProductos/:usuarioID', async (req, res) => {
  const { usuarioID } = req.params;

  try {
      // Buscar el carrito del usuario
      const carrito = await Carrito.findOne({ where: { usuarioID } });
      console.log('Carrito encontrado:', carrito);

      if (!carrito) {
          return res.status(404).json({ mensaje: 'Carrito no encontrado.' });
      }

      // Obtener los productos del carrito
      const productosCarrito = await ProductoCarrito.findAll({
          where: { carritoID: carrito.id },
          include: [
              {
                  model: ProductoDetalle,  // Usar ProductoDetalle ya que contiene el stock
                  attributes: ['id', 'cantidad'], // Obtenemos la cantidad disponible en stock y el id
                  include: {
                      model: Producto,  // Incluimos Producto si necesitamos el nombre
                      attributes: ['nombre']
                  }
              }
          ]
      });
      console.log('Productos en carrito:', productosCarrito);

      // Verificar si el carrito tiene productos
      if (productosCarrito.length === 0) {
          return res.status(400).json({ mensaje: 'No hay productos en el carrito para actualizar el stock.' });
      }

      // Iterar sobre los productos del carrito y actualizar el stock
      for (let item of productosCarrito) {
          const stockProducto = item.ProductoDetalle;
          console.log('Stock del producto:', stockProducto);

          if (stockProducto) {
              // Restar la cantidad del producto comprado del stock actual
              const nuevaCantidad = stockProducto.cantidad - item.cantidad;
              console.log('Nueva cantidad:', nuevaCantidad);

              // Verificar si hay stock suficiente
              if (nuevaCantidad < 0) {
                  return res.status(400).json({
                      mensaje: `No hay suficiente stock para el producto ${item.ProductoDetalle.Producto.nombre}. Stock disponible: ${stockProducto.cantidad}.`,
                  });
              }

              // Asegurarse de que estamos usando el ID correcto para actualizar
              await ProductoDetalle.update({ cantidad: nuevaCantidad }, { where: { id: stockProducto.id } });
          } else {
              return res.status(404).json({
                  mensaje: `No se encontró el producto con ID: ${item.productoDetalleID} en el stock.`,
              });
          }
      }

      res.status(200).json({ mensaje: 'Stock actualizado correctamente.' });
  } catch (error) {
      console.error('Error al actualizar el stock:', error);
      res.status(500).json({ mensaje: 'Error interno del servidor.', detalles: error.message });
  }
});


router.delete('/eliminarCarrito/:usuarioID', async (req, res) => {
  const { usuarioID } = req.params;

  try {
      // Buscar el carrito del usuario
      const carrito = await Carrito.findOne({ where: { usuarioID } });

      if (!carrito) {
          return res.status(404).json({ mensaje: 'Carrito no encontrado.' });
      }

      // Eliminar todos los productos del carrito en ProductoCarrito
      await ProductoCarrito.destroy({ where: { carritoID: carrito.id } });

      res.status(200).json({ mensaje: 'Productos del carrito eliminados correctamente.' });
  } catch (error) {
      console.error('Error al eliminar los productos del carrito:', error);
      res.status(500).json({ mensaje: 'Error interno del servidor.', detalles: error.message });
  }
});

// Endpoint para obtener todas las órdenes de un usuario específico
router.get('/ordenesUsuario/:usuarioID', async (req, res) => {
    const { usuarioID } = req.params;

    try {
        // Buscar todas las órdenes asociadas al usuarioID
        const ordenes = await Orden.findAll({
            where: { usuarioID },
            include: [
                {
                    model: ProductoOrden,
                    attributes: ['cantidad', 'precio'],
                    include: [
                        {
                            model: ProductoDetalle,
                            attributes: ['precio'],
                            include: {
                                model: Producto,
                                attributes: ['nombre']
                            }
                        }
                    ]
                }
            ]
        });

        if (ordenes.length === 0) {
            return res.status(404).json({ mensaje: 'No se encontraron órdenes para este usuario.' });
        }

        // Estructurar la respuesta para cada orden
        const detallesOrdenes = ordenes.map(orden => ({
            id: orden.id,
            direccionEnvio: orden.direccionEnvio,
            estado: orden.estado,
            subtotal: orden.subtotal,
            costoEnvio: orden.costoEnvio,
            impuestos: orden.impuestos,
            total: orden.total,
            productos: orden.ProductoOrdens.map(item => ({
                nombre: item.ProductoDetalle.Producto.nombre,
                cantidad: item.cantidad,
                precioUnitario: item.precio,
                precioTotal: (item.cantidad * item.precio).toFixed(2)
            }))
        }));

        res.status(200).json(detallesOrdenes);
    } catch (error) {
        console.error('Error al obtener las órdenes del usuario:', error);
        res.status(500).json({ mensaje: 'Error interno del servidor', detalles: error.message });
    }
});


export default router;
