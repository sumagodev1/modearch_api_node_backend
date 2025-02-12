const express = require('express');
const { validateGetInTouch, validateGetInTouchId } = require('../validations/getInTouchValidation');
const {
  addGetInTouch,
  getGetInTouches,
  updateGetInTouch,
  deleteGetInTouch,
} = require('../controllers/getInTouchController');
const authenticateToken = require('../middleware/auth');

const router = express.Router();

router.post('/add-getintouch', validateGetInTouch, addGetInTouch);
router.get('/find-getintouch', authenticateToken, getGetInTouches);
router.put('/update/:id', authenticateToken, validateGetInTouchId, validateGetInTouch, updateGetInTouch);
router.delete('/delete/:id', authenticateToken, validateGetInTouchId, deleteGetInTouch);

module.exports = router;
