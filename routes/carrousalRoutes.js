const express = require('express');
const { upload } = require('../middleware/multer');
const { validateCarrousalId } = require('../validations/carrousalValidation');
const {
  addCarrousal,
  updateCarrousal,
  getCarrousals,
  toggleCarrousalStatus,
  toggleCarrousalDelete
} = require('../controllers/carrousalController');
const authenticateToken = require('../middleware/auth');
const imageRequired = require('../validations/imageValidation');

const router = express.Router();

router.post('/create-carrousal', upload.single('img'), authenticateToken, addCarrousal);
router.put('/update-carrousal/:id', upload.single('img'), authenticateToken, validateCarrousalId, updateCarrousal);
router.get('/get-carrousal', getCarrousals);
router.get('/find-carrousal', authenticateToken, getCarrousals);
router.put('/isactive-carrousal/:id', authenticateToken, validateCarrousalId, toggleCarrousalStatus);
router.delete('/isdelete-carrousal/:id', authenticateToken, validateCarrousalId, toggleCarrousalDelete);

module.exports = router;
