export {};

const express = require('express');
const menuOpcionesFechaController = require('../controllers/MenuOpcionesFechaController');
const router = express.Router();

// POST /menuOpcionesFecha/post
router.post('/post', menuOpcionesFechaController.createMenuOpciones);

// GET /menuOpcionesFecha/getAll
router.get('/getAll', menuOpcionesFechaController.getMenusOpciones);

// GET /menuOpcionesFecha/getAll
router.get('/getAllPendientes', menuOpcionesFechaController.getMenusOpcionesNoPosteados);

// DELETE /menuOpcionesFecha/getAll
router.delete('/delete', menuOpcionesFechaController.deleteMO);



module.exports = router;