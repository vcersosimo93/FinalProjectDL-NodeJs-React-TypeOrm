const expressPedido = require('express');
const pedidoController = require('../controllers/PedidoController');
const routerPedido = expressPedido.Router();

routerPedido.get('/get', pedidoController.getPedidos);
routerPedido.get('/getTimeline', pedidoController.getPedidosDelDia);
routerPedido.post('/finalizar', pedidoController.finalizarPedidos);

module.exports = routerPedido;