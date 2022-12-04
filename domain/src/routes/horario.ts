const expressHorario = require('express');
const horarioController = require('../controllers/HorarioController');
const routerHorario = expressHorario.Router();

routerHorario.get('/get', horarioController.getHorarios);

module.exports = routerHorario;