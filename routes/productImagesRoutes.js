// routes/productImagesRoutes.js
const { upload } = require('../middleware/multer');

const express = require('express');
const {
  addProductImage,
  updateProductImage,
  getProductImages,
  deleteProductImage,
} = require('../controllers/productImagesController');
const authenticateToken = require('../middleware/auth');

const router = express.Router();

router.post('/create-productimage', upload.single('img'),authenticateToken, addProductImage);
router.put('/update-productimage/:id', upload.single('img'), authenticateToken, updateProductImage);
router.get('/get-productimages', authenticateToken, getProductImages);
router.delete('/delete-productimage/:id', authenticateToken, deleteProductImage);

module.exports = router;
