// routes/leadershipRoutes.js

const express = require('express');
const { upload } = require('../middleware/multer');
const {
  addLeadership,
  updateLeadership,
  getLeadership,
  toggleLeadershipStatus,
  toggleLeadershipDelete,
} = require('../controllers/leadershipController');
const authenticateToken = require('../middleware/auth');
const router = express.Router();

router.post('/create-leadership', upload.single('img'), authenticateToken, addLeadership);
router.put('/update-leadership/:id', upload.single('img'), authenticateToken, updateLeadership);
router.get('/get-leadership', getLeadership);
router.put('/isactive-leadership/:id', authenticateToken, toggleLeadershipStatus);
router.delete('/isdelete-leadership/:id', authenticateToken, toggleLeadershipDelete);

module.exports = router;
