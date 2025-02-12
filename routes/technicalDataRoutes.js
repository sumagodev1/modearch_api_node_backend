// routes/technicalDataRoutes.js
const express = require('express');
const { 
  addTechnicalData, 
  updateTechnicalData, 
  getTechnicalData ,
  deleteTechnicalData
} = require('../controllers/technicalDataController');
const authenticateToken = require('../middleware/auth');

const router = express.Router();

router.post('/create-technicaldata', authenticateToken, addTechnicalData);
router.put('/update-technicaldata/:id', authenticateToken, updateTechnicalData);
router.get('/get-technicaldata', authenticateToken, getTechnicalData);
router.delete('/delete-technical/:id',authenticateToken,deleteTechnicalData);
module.exports = router;
