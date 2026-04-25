const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/todos', userController.obtenerUsuarios);
router.post('/usuarios', userController.crearUsuario);
router.put('/usuarios/:id', userController.actualizarUsuario);
router.delete('/usuarios/:id', userController.borrarUsuario);

module.exports = router;