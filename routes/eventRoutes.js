// routes/eventRoutes.js
const express = require('express');
const { upload } = require('../middleware/multer');
const {
  addEvent,
  updateEvent,
  getEvents,
  isActiveStatusEvent,
  isDeleteStatusEvent,
} = require('../controllers/eventController');
const authenticateToken = require('../middleware/auth');
const {
  validateEvent,
  validateEventId,
} = require('../validations/eventValidation');

const router = express.Router();

router.post('/create-event', upload.single('img'), authenticateToken, validateEvent, addEvent);
router.put('/update-event/:id', upload.single('img'), authenticateToken, validateEvent, validateEventId, updateEvent);
router.get('/get-events', getEvents);
router.get('/find-events', authenticateToken, getEvents);
router.put('/isactive-event/:id', authenticateToken, validateEventId, isActiveStatusEvent);
router.delete('/isdelete-event/:id', authenticateToken, validateEventId, isDeleteStatusEvent);

module.exports = router;
