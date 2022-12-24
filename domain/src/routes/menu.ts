export {};

const express = require('express');
const menuController = require('../controllers/menuController');
const router = express.Router();

// POST /menu/post
router.post('/post', menuController.createMenu);

// GET /menu/getAll
router.get('/getAll', menuController.getMenus);

// GET /menu/getById
router.get('/getById', menuController.getMenuById);

// PUT /menu/update
router.put('/update', menuController.updateMenu);

// DELETE /menu/delete
router.delete('/delete', menuController.deleteMenu);

// GET /menu/delete
router.get('/getNombre', menuController.getMenuNombre);


module.exports = router;