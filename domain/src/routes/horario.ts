const expressHorario = require('express');
const horarioController = require('../controllers/HorarioController');
const routerHorario = expressHorario.Router();

routerHorario.get('/get', horarioController.getHorarios);

routerHorario.post('/post', horarioController.createHorario);

module.exports = routerHorario;