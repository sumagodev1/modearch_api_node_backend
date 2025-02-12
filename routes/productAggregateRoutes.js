// routes/productAggregateRoutes.js
const express = require('express');
const {
  getAllProductData,deleteProductAndData,toggleActiveStatusForAll,toggleDeleteStatusForAll
} = require('../controllers/productAggregateController');
const authenticateToken = require('../middleware/auth');

const router = express.Router();

router.get('/get-all-productdata/:productId', getAllProductData);
router.delete('/delete-products/:productId',deleteProductAndData);
router.put('/activate-products/:id',toggleActiveStatusForAll);

// Toggle delete status for all related data
router.delete('/products/:id/delete-all',toggleDeleteStatusForAll);

module.exports = router;
