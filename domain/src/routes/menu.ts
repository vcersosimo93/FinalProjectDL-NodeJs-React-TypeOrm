export {};

const express = require('express');
const menuController = require('../controllers/menuController');
const router = express.Router();

// POST /menu/post
router.post('/post', menuController.createMenu);

// POST /menu/post
router.get('/getAll', menuController.getMenus);

// POST /menu/post
//router1.post('/post2', menuController.createPost);

// GET /menu/posts
//router1.get('/menus', menuController.getMenus);

module.exports = router;