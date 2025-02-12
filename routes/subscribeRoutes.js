// routes/subscribeRoutes.js
const express = require('express');
const { validateSubscribe, validateSubscribeId } = require('../validations/subscribeValidation');
const {
  addSubscribe,
  getSubscribes,
  updateSubscribe,
  deleteSubscribe,
} = require('../controllers/subscribeController');
const authenticateToken = require('../middleware/auth');
const sendEmail = require('../middleware/nodemailer');

const router = express.Router();

router.post('/add-subscribeemail', validateSubscribe, addSubscribe, sendEmail);
router.get('/find-subscribedemail', authenticateToken, getSubscribes);
router.put('/update/:id', authenticateToken, validateSubscribeId, validateSubscribe, updateSubscribe);
router.delete('/delete/:id', authenticateToken, validateSubscribeId, deleteSubscribe);

module.exports = router;
