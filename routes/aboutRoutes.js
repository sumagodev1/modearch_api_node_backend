const express = require('express');
const { upload } = require('../middleware/multer');
const {
  addAbout,
  updateAbout,
  getAbout,
  toggleAboutStatus,
  toggleAboutDelete
} = require('../controllers/aboutController');
const authenticateToken = require('../middleware/auth');

const router = express.Router();

// Create new About entry
router.post('/create-about', upload.single('img'), authenticateToken, addAbout);

// Update About entry
router.put('/update-about/:id', upload.single('img'), authenticateToken, updateAbout);

// Get all About entries
router.get('/get-about', getAbout);

// Toggle Active Status
router.put('/isactive-about/:id', authenticateToken, toggleAboutStatus);

// Soft Delete About (Toggle isDelete)
router.delete('/isdelete-about/:id', authenticateToken, toggleAboutDelete);

module.exports = router;
