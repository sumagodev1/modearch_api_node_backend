const express = require('express');
const { validateRequestCallbackForm, validateRequestCallbackFormId } = require('../validations/requestCallbackFormValidation');
const {
  addRequestCallbackForm,
  getRequestCallbackForms,
  updateRequestCallbackForm,
  deleteRequestCallbackForm,
} = require('../controllers/requestCallbackFormController');
const authenticateToken = require('../middleware/auth');

const router = express.Router();

router.post('/add-requestcallback', validateRequestCallbackForm, addRequestCallbackForm);
router.get('/find-requestcallback', authenticateToken, getRequestCallbackForms);
router.put('/update/:id', authenticateToken, validateRequestCallbackFormId, validateRequestCallbackForm, updateRequestCallbackForm);
router.delete('/delete/:id', authenticateToken, validateRequestCallbackFormId, deleteRequestCallbackForm);

module.exports = router;
