const express = require('express');
const { validateInfrastructure, validateInfrastructureId } = require('../validations/infrastructureValidation');
const {
  addCategory,
  updateCategory,
  getCategory,
  isActiveStatus,
  isDeleteStatus
} = require('../controllers/categoryController');
const authenticateToken = require('../middleware/auth');

const router = express.Router();

router.post('/create-category', authenticateToken, validateInfrastructure, addCategory);
router.put('/update-category/:id', authenticateToken, validateInfrastructure, validateInfrastructureId, updateCategory);
router.get('/get-category', getCategory);
router.get('/find-category', authenticateToken, getCategory);
router.put('/isactive-category/:id', authenticateToken, validateInfrastructureId, isActiveStatus);
router.delete('/isdelete-category/:id', authenticateToken, validateInfrastructureId, isDeleteStatus);

module.exports = router;
