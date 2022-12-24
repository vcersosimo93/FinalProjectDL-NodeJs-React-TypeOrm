export {};

const express = require('express');
const menuOpcionesFechaController = require('../controllers/MenuOpcionesFechaController');
const router = express.Router();

// POST /menuOpcionesFecha/post
router.post('/post', menuOpcionesFechaController.createMenuOpciones);

// GET /menuOpcionesFecha/getAll
router.get('/getAll', menuOpcionesFechaController.getMenusOpciones);




module.exports = router;