const express = require('express');
const { loginUser, changePassword, getProfile, verifyCaptcha } = require('../controllers/authController');
const authenticateToken = require('../middleware/auth');
const { validateLogin } = require('../validations/loginvalidation');
const { validateChangePassword } = require('../validations/changePasswordValidation');

const router = express.Router();

router.post('/verify-captcha', verifyCaptcha);
router.post('/login', validateLogin, loginUser);
router.put('/change-password', authenticateToken, validateChangePassword, changePassword);

router.get('/get-profile', authenticateToken, getProfile);

module.exports = router;
