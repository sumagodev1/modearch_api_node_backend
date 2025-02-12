const express = require('express');
const { upload } = require('../middleware/multer');
const { validateContactPerson, validateContactPersonId } = require('../validations/contactPersonValidation');
const {
  addContactPerson,
  updateContactPerson,
  getContactPersons,
  toggleContactPersonStatus,
  toggleContactPersonDelete
} = require('../controllers/contactPersonController');
const authenticateToken = require('../middleware/auth');
const imageRequired = require('../validations/imageValidation');
const router = express.Router();

router.post('/create-contactperson', upload.single('img'), imageRequired, authenticateToken, validateContactPerson, addContactPerson);
router.put('/update-contactperson/:id', upload.single('img'), authenticateToken, validateContactPerson, validateContactPersonId, updateContactPerson);
router.get('/get-contactpersons', getContactPersons);
router.get('/find-contactpersons', authenticateToken, getContactPersons);
router.put('/isactive-contactperson/:id', authenticateToken, validateContactPersonId, toggleContactPersonStatus);
router.delete('/isdelete-contactperson/:id', authenticateToken, validateContactPersonId, toggleContactPersonDelete);

module.exports = router;
