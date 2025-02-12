// routes/OueleadersRoutes.js
const express = require('express');
const { upload } = require('../middleware/multer');
const {
  addOueleaders,
  updateOueleaders,
  getOueleaderss,
  isActiveStatusOueleaders,
  isDeleteStatusOueleaders,
} = require('../controllers/OurleaderController');
const authenticateToken = require('../middleware/auth');
const {
  validateEvent,
  validateEventId,
} = require('../validations/eventValidation');

const router = express.Router();

router.post('/create-Oueleaders', upload.single('img'), authenticateToken,  validateEvent, addOueleaders);
router.put('/update-Oueleaders/:id', upload.single('img'), authenticateToken,validateEvent, validateEventId, updateOueleaders);
router.get('/get-Oueleaderss', getOueleaderss);
router.get('/find-Oueleaderss', authenticateToken, getOueleaderss);
router.put('/isactive-Oueleaders/:id', authenticateToken, validateEventId, isActiveStatusOueleaders);
router.delete('/isdelete-Oueleaders/:id', authenticateToken, validateEventId, isDeleteStatusOueleaders);

module.exports = router;
