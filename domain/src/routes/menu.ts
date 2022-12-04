export {};

const express = require('express');
const menuController = require('../controllers/menuController');
const router = express.Router();


router.post('/post', menuController.createMenu);

router.get('/getAll', menuController.getMenus);

module.exports = router;