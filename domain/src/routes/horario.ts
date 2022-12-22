const expressHorario = require('express');
const horarioController = require('../controllers/HorarioController');
const routerHorario = expressHorario.Router();

// GET /horario/get
routerHorario.get('/get', horarioController.getHorarios);

// POST /horario/post
routerHorario.post('/post', horarioController.createHorario);

// PUT /horario/update
routerHorario.put('/update', horarioController.updateHorario);

// DELETE /horario/delete
routerHorario.delete('/delete', horarioController.deleteHorario);

module.exports = routerHorario;