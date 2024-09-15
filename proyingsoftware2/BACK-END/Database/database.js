import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize("grupo7_bd", "dosisXtra", "Farmacia", {
    host: 'localhost',     // Cambia si usas un host distinto
    dialect: 'mysql',      // Cambia según tu base de datos: 'mysql' | 'postgres' | 'sqlite'
    logging: false,        // Desactiva los logs de consultas (opcional)
  });
 /*, {
    host: "juegosbd.postgres.database.azure.com",
    dialect: "postgres",
    port: 5432,
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    }
});*/

sequelize.authenticate()
    .then(() => {
        console.log('Conexión establecida con éxito.');
    })
    .catch(err => {
        console.error('No se puede conectar a la base de datos:', err);
    });