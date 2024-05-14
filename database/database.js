const mysql = require('mysql');

// CONEXION DATABASE
const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    connectionLimit: process.env.DB_CONNECTION_LIMIT
});

connection.connect((err) => {
    if(err) {
        console.log("Error al conectar MYSQL: {0}", err);
        return
    }
    console.log("¡Conexión a MYSQL establecida exitosamente!")
})

module.exports = connection