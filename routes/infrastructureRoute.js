const express = require('express');
const { upload } = require('../middleware/multer');
const { validateInfrastructure, validateInfrastructureId } = require('../validations/infrastructureValidation');
const {
  addInfrastructure,
  updateInfrastructure,
  getInfrastructure,
  isActiveStatus,
  isDeleteStatus
} = require('../controllers/infrastructureController');
const authenticateToken = require('../middleware/auth');

const router = express.Router();

router.post('/create-infrastructure', upload.single('img'), authenticateToken, validateInfrastructure, addInfrastructure);
router.put('/update-infrastructure/:id', upload.single('img'), authenticateToken, validateInfrastructure, validateInfrastructureId, updateInfrastructure);
router.get('/get-infrastructure', getInfrastructure);
router.get('/find-infrastructure', authenticateToken, getInfrastructure);
router.put('/isactive-infrastructure/:id', authenticateToken, validateInfrastructureId, isActiveStatus);
router.delete('/isdelete-infrastructure/:id', authenticateToken, validateInfrastructureId, isDeleteStatus);

module.exports = router;
