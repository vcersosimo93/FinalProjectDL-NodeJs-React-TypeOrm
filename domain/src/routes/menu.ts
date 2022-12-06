export {};

const express = require('express');
const menuController = require('../controllers/menuController');
const router = express.Router();

// POST /menu/post
router.post('/post', menuController.createMenu);

// GET /menu/post
router.get('/getAll', menuController.getMenus);

// GET /menu/post
router.get('/getById', menuController.getMenuById);

// PUT /menu/post
router.put('/update', menuController.updateMenu);

// PUT /menu/post
router.delete('/delete', menuController.deleteMenu);


// POST /menu/post
//router1.post('/post2', menuController.createPost);

// GET /menu/posts
//router1.get('/menus', menuController.getMenus);

module.exports = router;