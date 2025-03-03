const express = require('express');
const { upload } = require('../middleware/multer');
const { validateProjectDetails, validateProjectDetailsId } = require('../validations/projectDetailsValidation');
const {
  addGalleryDetails,
  updateGalleryDetails,
  getGalleryDetails,
  isActiveStatus,
  isDeleteStatus
} = require('../controllers/galleryDetailsController');
const authenticateToken = require('../middleware/auth');

const router = express.Router();

router.post('/create-galleryDetails', upload.single('img'), authenticateToken,  addGalleryDetails);
router.put('/update-galleryDetails/:id', upload.single('img'), authenticateToken, validateProjectDetailsId, updateGalleryDetails);
router.get('/get-galleryDetails', getGalleryDetails);
router.get('/find-galleryDetails', authenticateToken, getGalleryDetails);
router.put('/isactive-galleryDetails/:id', authenticateToken, validateProjectDetailsId, isActiveStatus);
router.delete('/isdelete-galleryDetails/:id', authenticateToken, validateProjectDetailsId, isDeleteStatus);

module.exports = router;
