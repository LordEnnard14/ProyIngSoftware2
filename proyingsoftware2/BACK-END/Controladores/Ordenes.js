//aqui se realiza la paga
import express from "express"; 
import { Orden, Usuario,ProductoOrden ,Carrito, ProductoCarrito, Producto,ProductoDetalle } from '../Models/Relaciones.js';  // Asegúrate de importar StockProducto

const router = express.Router();
const TASA_IMPUESTO = 0.18;  // Representa el 18% de impuestos

router.get('/:usuarioID', async (req, res) => {
    const { usuarioID } = req.params; // Obtener el usuarioID desde los parámetros
  
    try {
      // Primero, buscamos el carrito asociado al usuarioID
      const carrito = await Carrito.findOne({ where: { usuarioID } });
  
      // Si no se encuentra el carrito, devolvemos un error
      if (!carrito) {
        return res.status(404).json({ mensaje: 'Carrito no encontrado para este usuario.' });
      }
  
      const carritoID = carrito.id; // Obtener el carritoID del carrito encontrado
  
      // Buscar los productos en ProductoCarrito que correspondan al carrito
      const productosCarrito = await ProductoCarrito.findAll({
        where: { carritoID }, // Usamos el carritoID
        attributes: ['cantidad'], // Obtenemos la cantidad de cada producto en el carrito
        include: [
          {
            model: Producto,
            attributes: ['nombre'], // Obtenemos el nombre del producto
            include: [
              {
                model: StockProducto,
                attributes: ['precio'], // Obtenemos el precio del producto
              }
            ]
          }
        ]
      });
  
      // Verificar si hay productos en el carrito
      if (productosCarrito.length === 0) {
        return res.status(404).json({ mensaje: 'No se encontraron productos en el carrito.' });
      }
  
      // Mapeamos los datos deseados (nombre, precio y cantidad)
      const productos = productosCarrito.map(item => ({
        nombre: item.Producto.nombre,
        precio: item.Producto.StockProducto.precio,
        cantidad: item.cantidad // Cantidad del producto en el carrito
      }));
  
      // Devolver los productos con nombre, precio y cantidad
      res.status(200).json(productos);
    } catch (error) {
      console.error('Error al obtener los productos del carrito:', error);
      res.status(500).json({ mensaje: 'Error interno del servidor' });
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
                    model: ProductoDetalle,  // Obtener el precio desde ProductoDetalle
                    attributes: ['precio'],
                    include: {
                        model: Producto,  // Obtener el nombre del producto
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
        const costoEnvio = metodoEntrega === 'entrega' ? 10 : 0;  // Si es entrega a domicilio, se cobra

        // Calcular el impuesto (18%)
        const impuesto = (subtotal + costoEnvio) * 0.18;  // TASA_IMPUESTO = 0.18
        const impuestoFinal = isNaN(impuesto) ? 0 : impuesto.toFixed(2);

        // Calcular el total
        const total = subtotal + costoEnvio + parseFloat(impuestoFinal);

        // Si el método de entrega es "recojo", usamos la botica seleccionada como dirección
        const direccionFinal = metodoEntrega === 'recojo' ? `Recojo en ${botica}` : direccionEnvio;

        // Validar que haya una dirección válida para la entrega a domicilio
        if (metodoEntrega === 'entrega' && !direccionEnvio) {
            return res.status(400).json({ mensaje: 'Debe proporcionar una dirección para la entrega a domicilio.' });
        }

        // Validar que haya una botica seleccionada si es recojo en tienda
        if (metodoEntrega === 'recojo' && !botica) {
            return res.status(400).json({ mensaje: 'Debe seleccionar una botica para el recojo en tienda.' });
        }

        // Crear la nueva orden en la base de datos
        const nuevaOrden = await Orden.create({
            estado: 'pendiente',
            direccionEnvio: direccionFinal,  // Usar "Recojo en [botica]" o la dirección para entrega
            subtotal: subtotal.toFixed(2),
            costoEnvio: costoEnvio.toFixed(2),
            impuestos: impuestoFinal,
            total: total.toFixed(2),
            usuarioID: usuarioID,
        });

        // Transferir productos del carrito a ProductoOrden
        for (const producto of productosCarrito) {
            await ProductoOrden.create({
                ordenID: nuevaOrden.id,
                productoDetalleID: producto.ProductoDetalle.id,
                cantidad: producto.cantidad,
                precio: producto.ProductoDetalle.precio
            });
        }

        // No eliminar el carrito ni los productos (lo harás después según indicaste)

        res.status(201).json({
            mensaje: 'Orden creada exitosamente.',
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
                  model: ProductoDetalle,  // Usamos ProductoDetalle en lugar de Producto
                  attributes: ['precio'],  // Obtener el precio desde ProductoDetalle
                  include: {
                      model: Producto,  // Incluir Producto para obtener el nombre u otros detalles
                      attributes: ['nombre']  // Ejemplo: obtener el nombre del producto
                  }
              }
          ]
      });

      if (productosCarrito.length === 0) {
          return res.status(404).json({ mensaje: 'No se encontraron productos en el carrito.' });
      }

      // Iteramos sobre los productos del carrito y llenamos la tabla ProductoOrden
      for (const item of productosCarrito) {
          const precioTotal = item.ProductoDetalle.precio * item.cantidad;  // Precio total = precio unitario * cantidad

          await ProductoOrden.create({
              ordenID: ordenID,                           // ID de la orden
              productoDetalleID: item.productoDetalleID,   // ID del producto en ProductoDetalle
              cantidad: item.cantidad,                    // Cantidad del producto en el carrito
              precio: item.ProductoDetalle.precio.toFixed(2), // Precio unitario
              precioTotal: precioTotal.toFixed(2)         // Precio total por la cantidad de productos
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

  /*ORDENES DE UN USUARIO*/

  router.get("/", async (req, res) => {
    try {
        // Obtener todas las ordenes en la base de datos
        const ordenes = await Orden.findAll();
        res.json(ordenes);  // Aqui se envian a todas las ordenes como respuesta
    } catch (error) { //Por si existe un error
        console.error("Error al obtener ordenes:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
});

export default router;
