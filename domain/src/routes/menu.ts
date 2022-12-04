export {};

const express = require('express');
const menuController = require('../controllers/menuController');
const router = express.Router();


router.post('/post', menuController.createMenu);

router.get('/getAll', menuController.getMenus);

<<<<<<< HEAD
=======
// GET /menu/post
router.get('/getById', menuController.getMenuById);

// GET /menu/post
router.put('/update', menuController.updateMenu);


// POST /menu/post
//router1.post('/post2', menuController.createPost);

// GET /menu/posts
//router1.get('/menus', menuController.getMenus);

>>>>>>> 807e2a6795c85535b2f21f97bbe073a06dbb8917
module.exports = router;