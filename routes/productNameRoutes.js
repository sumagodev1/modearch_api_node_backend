const express = require('express');
const { validateProductName, validateProductNameId } = require('../validations/productNameValidation');
const {
  addProductName,
  getProductNames,
  updateProductName,
  isActiveStatus,
  isDeleteStatus,
} = require('../controllers/productNameController');
const authenticateToken = require('../middleware/auth');

const router = express.Router();

router.post('/create-productname', authenticateToken, validateProductName, addProductName);
router.get('/get-productnames', getProductNames);
router.get('/find-productnames', authenticateToken, getProductNames);
router.put('/update-productname/:id', authenticateToken, validateProductNameId, validateProductName, updateProductName);
router.put('/isactive-productname/:id', authenticateToken, validateProductNameId, isActiveStatus);
router.delete('/isdelete-productname/:id', authenticateToken, validateProductNameId, isDeleteStatus);

module.exports = router;
