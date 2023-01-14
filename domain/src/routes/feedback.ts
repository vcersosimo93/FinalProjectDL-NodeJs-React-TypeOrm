export {};

const express = require('express');
const FeedbackController = require('../controllers/FeedbackController');
const router = express.Router();

// GET /feedback/get
router.get('/getAll', FeedbackController.getFeedbacks);


module.exports = router;