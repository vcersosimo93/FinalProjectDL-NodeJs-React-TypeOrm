const expressSlack = require('express');
const apiSlack = require('../slack/apiSlack');
const routerSlack = expressSlack.Router();

routerSlack.post('/publicarMensaje', apiSlack.publicarMensaje);
routerSlack.get('/pedidosDelDia', apiSlack.pedidosDelDia);

module.exports = routerSlack;