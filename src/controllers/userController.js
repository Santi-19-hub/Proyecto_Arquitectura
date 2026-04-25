const db = require('../config/db');
const fetch = globalThis.fetch;

// LISTAR USUARIO
exports.obtenerUsuarios = (req, res) => {
    db.query("SELECT * FROM usuarios", (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results);
    });
};

// CREAR USUARIO
exports.crearUsuario = (req, res) => {
    const { nombre, correo } = req.body;
    
    db.query("INSERT INTO usuarios (nombre, correo) VALUES (?, ?)", [nombre, correo], (err, result) => {
        if (err) return res.status(500).send(err);

        fetch('http://localhost:3002/api/logs', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                accion: 'REGISTRO_USUARIO',
                detalle: `Se registró al usuario ${nombre}`
            })
        })
        .then(() => console.log('✅ Log enviado al servicio de bitácora'))
        .catch(err => console.error('❌ Error enviando log:', err));

        res.send(`✅ Usuario ${nombre} creado`);
    });
};

// ACTUALIZAR USUARIO
exports.actualizarUsuario = (req, res) => {
    const { id } = req.params;
    const { nombre, correo } = req.body;
    db.query("UPDATE usuarios SET nombre = ?, correo = ? WHERE id = ?", [nombre, correo, id], (err) => {
        if (err) return res.status(500).send(err);
        res.send("✅ Usuario actualizado");
    });
};

// BORRAR USUARIO
exports.borrarUsuario = (req, res) => {
    const { id } = req.params;
    db.query("DELETE FROM usuarios WHERE id = ?", [id], (err) => {
        if (err) return res.status(500).send(err);
        res.send("🗑️ Usuario eliminado");
    });
};



