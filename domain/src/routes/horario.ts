const express = require('express');
const horarioController = require('../controllers/HorarioController');
const router = express.Router();

router.get('/get', horarioController.getHoras);

module.exports = router;