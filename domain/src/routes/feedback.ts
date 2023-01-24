export {};

const express = require('express');
const FeedbackController = require('../controllers/FeedbackController');
const router = express.Router();

// GET /feedback/get
router.get('/getAll', FeedbackController.getFeedbacks);

// POST /feedback/post
router.post('/post', FeedbackController.createFeedback);

module.exports = router;