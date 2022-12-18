const expressHorario = require('express');
const horarioController = require('../controllers/HorarioController');
const routerHorario = expressHorario.Router();

routerHorario.get('/get', horarioController.getHorarios);

routerHorario.post('/post', horarioController.createHorario);

routerHorario.put('/update', horarioController.updateHorario);

routerHorario.delete('/delete', horarioController.deleteHorario);

module.exports = routerHorario;