const express = require('express');
const { projectNameValidation, projectNameValidationId } = require('../validations/projectNameValidation');
const {
  addProjectName,
  updateProjectName,
  getProjectName,
  isActiveStatus,
  isDeleteStatus
} = require('../controllers/projectNameController');
const authenticateToken = require('../middleware/auth');

const router = express.Router();

router.post('/create-projectName', authenticateToken, projectNameValidation, addProjectName);
router.put('/update-projectName/:id', authenticateToken, projectNameValidation, projectNameValidationId, updateProjectName);
router.get('/get-projectName', getProjectName);
router.get('/find-projectName', authenticateToken, getProjectName);
router.put('/isactive-projectName/:id', authenticateToken, projectNameValidationId, isActiveStatus);
router.delete('/isdelete-projectName/:id', authenticateToken, projectNameValidationId, isDeleteStatus);

module.exports = router;
