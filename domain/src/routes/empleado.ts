export {};

const express = require('express');
const EmpleadoFechaController = require('../controllers/EmpleadoController');
const router = express.Router();

// POST /empleado/post
router.post('/post', EmpleadoFechaController.createEmpleado);


// GET /empleado/get
router.get('/getAll', EmpleadoFechaController.getEmpleados);


module.exports = router;