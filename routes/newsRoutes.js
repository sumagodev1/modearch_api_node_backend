const express = require('express');
const { uploadFiles } = require('../middleware/fileUploadMiddleware');
const {
  addNewsEvent,
  updateNewsEvent,
  getNewsEvents,
  isActiveStatus,
  isDeleteStatus,
} = require('../controllers/newsController');
const authenticateToken = require('../middleware/auth');
const {
  validateNewsEvent,
  validateNewsEventId,
} = require('../validations/newsEventValidation');

const router = express.Router();

router.post('/create-news', uploadFiles, authenticateToken, validateNewsEvent, addNewsEvent);
router.put('/update-news/:id', uploadFiles, authenticateToken, validateNewsEvent, validateNewsEventId, updateNewsEvent);
router.get('/get-news', getNewsEvents);
router.put('/isactive-news/:id', authenticateToken, validateNewsEventId, isActiveStatus);
router.delete('/isdelete-news/:id', authenticateToken, validateNewsEventId, isDeleteStatus);

module.exports = router;
