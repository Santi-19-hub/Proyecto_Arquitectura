const mysql = require('mysql2');

const conexion = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '', 
    database: 'clase_arquitectura', 
    port: 3307 
});

conexion.connect((err) => {
    if (err) {
        console.error("❌ Error de conexión: " + err.stack);
        return;
    }
    console.log("✅ Conectado a la base de datos por el puerto 3307");
});

module.exports = conexion;