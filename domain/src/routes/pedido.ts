const expressPedido = require('express');
const pedidoController = require('../controllers/PedidoController');
const routerPedido = expressPedido.Router();

routerPedido.get('/get', pedidoController.getPedidos);
routerPedido.get('/getTimeline', pedidoController.getPedidosDelDia);


module.exports = routerPedido;