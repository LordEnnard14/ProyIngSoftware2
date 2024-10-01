import { Sequelize } from "sequelize";

const sequelize = new Sequelize({
    dialect: "postgres",
    database: "dosisxtra",
    username: "postgres",
    password: "pass",
    host: "localhost",
    port: 5432,
    ssl: false,
    clientMinMessages: "notice",
});

export default sequelize; // Cambiado de module.exports a export default
