const express = require('express');
const { upload2 } = require('../middleware/multer');
const { validateProductDetails, validateProductDetailsId } = require('../validations/productDetailsValidation');
const {
  addProductDetails,
  updateProductDetails,
  getAllProductDetails,
  isActiveStatus,
  deleteProductDetails,getAllProductNames
} = require('../controllers/productDetailsController');
const authenticateToken = require('../middleware/auth');

const router = express.Router();

router.post('/create-productdetails', upload2, authenticateToken, validateProductDetails, addProductDetails);
router.put('/update-productdetails/:productId', upload2, authenticateToken, validateProductDetails, validateProductDetailsId, updateProductDetails);
router.get('/get-productdetails', getAllProductDetails);
router.get('/find-productdetails', authenticateToken, getAllProductDetails);
router.put('/isactive-productdetails/:id', authenticateToken, validateProductDetailsId, isActiveStatus);
router.delete('/isdelete-productdetails/:id', authenticateToken, validateProductDetailsId, deleteProductDetails);
router.get("/get-productnames",  getAllProductNames);
module.exports = router;
