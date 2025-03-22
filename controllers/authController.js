const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const apiResponse = require('../helper/apiResponse');
const bcrypt = require('bcrypt');
require('dotenv').config();
const axios = require("axios");

// const loginUser = async (req, res) => {
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     return apiResponse.validationErrorWithData(res, 'Validation Error', errors.array());
//   }

//   const { email, password } = req.body;
//   try {
//     const user = await User.findOne({ where: { email } });
//     if (!user) {
//       return apiResponse.notFoundResponse(res, 'User not found');
//     }

//     if (user.password !== password) {
//       return apiResponse.unauthorizedResponse(res, 'Invalid credentials');
//     }

//     const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
//       expiresIn: '2h',
//     });

//     return apiResponse.successResponseWithData(res, 'Login successful', { token });
//   } catch (error) {
//     console.log("Login failed", error);
//     return apiResponse.ErrorResponse(res, 'Login failed');
//   }
// };

const loginUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return apiResponse.validationErrorWithData(res, 'Validation Error', errors.array());
  }

  const { email, password } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return apiResponse.notFoundResponse(res, 'User not found');
    }

    // Compare the entered password with the hashed password in the database
    const isMatch = await bcrypt.compare(password, user.password); // bcrypt comparison

    if (!isMatch) {
      return apiResponse.unauthorizedResponse(res, 'Invalid credentials');
    }

    // If passwords match, generate the JWT token
    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
      expiresIn: '2h',
    });

    return apiResponse.successResponseWithData(res, 'Login successful', { token });
  } catch (error) {
    console.log("Login failed", error);
    return apiResponse.ErrorResponse(res, 'Login failed');
  }
};

const verifyCaptcha = async (req, res) => {
  

  const { captcha } = req.body;

  if (!captcha) {
      return res.json({ success: false, message: "CAPTCHA token is missing" });
  }

  console.log(captcha)
  try {
      const response = await axios.post(
          `https://www.google.com/recaptcha/api/siteverify`,
          new URLSearchParams({
              secret: process.env.SECRET_KEY,
              response: captcha,
          })
      );

      console.log(response)
      if (response.data.success) {
          return res.json({ success: true, message: "CAPTCHA verified" });
      } else {
          return res.json({ success: false, message: "CAPTCHA verification failed" });
      }
  } catch (error) {
    console.log("captcha verification failed", error);
    return apiResponse.ErrorResponse(res, 'captcha verification failed');
  }
};


const getProfile = async (req, res) => {
  try {

    const userId = req.user.id; 
    const user = await User.findByPk(userId);

    if (!user) {
      return apiResponse.notFoundResponse(res, 'User not found');
    }

    // Do not return the password or any sensitive data
    const { password, ...userInfo } = user.toJSON();

    return apiResponse.successResponseWithData(res, 'User profile fetched successfully', userInfo);
  } catch (error) {
    console.error('Error fetching user profile:', error);
    return apiResponse.ErrorResponse(res, 'Error fetching user profile');
  }
};

const changePassword = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return apiResponse.validationErrorWithData(res, 'Validation Error', errors.array());
  }

  const { oldPassword, newPassword } = req.body;
  const userId = req.user.id; // Extracted from the token

  try {
    const user = await User.findByPk(userId);
    if (!user) {
      return apiResponse.notFoundResponse(res, 'User not found');
    }

    // Compare hashed password with user input
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    
    if (!isMatch) {
      return apiResponse.validationErrorWithData(res, 'Old password is incorrect');
    }

    // Check if new password is different from old password
    if (oldPassword === newPassword) {
      return apiResponse.validationErrorWithData(res, 'New password cannot be the same as the old password');
    }

    // Hash new password before saving
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    return apiResponse.successResponse(res, 'Password changed successfully');
  } catch (error) {
    console.error('Password change failed:', error);
    return apiResponse.ErrorResponse(res, 'Password change failed');
  }
};


// const changePassword = async (req, res) => {
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     return apiResponse.validationErrorWithData(res, 'Validation Error', errors.array());
//   }

//   const { oldPassword, newPassword } = req.body;
//   const userId = req.user.id; // Extracted from the token

//   try {
//     const user = await User.findByPk(userId);
//     if (!user) {
//       return apiResponse.notFoundResponse(res, 'User not found');
//     }

//     // Compare old password directly (no bcrypt needed)
//     // if (user.password !== oldPassword) {
//     //   return apiResponse.unauthorizedResponse(res, 'Old password is incorrect');
//     // }

//     if (user.password !== oldPassword) {
//       return apiResponse.validationErrorWithData(res, 'Old password is incorrect');
//     }    

//     // Check if new password is different from old password
//     if (oldPassword === newPassword) {
//       return apiResponse.validationErrorWithData(res, 'New password cannot be the same as the old password');
//     }

//     // Update password
//     user.password = newPassword;
//     await user.save();

//     return apiResponse.successResponse(res, 'Password changed successfully');
//   } catch (error) {
//     console.error('Password change failed:', error);
//     return apiResponse.ErrorResponse(res, 'Password change failed');
//   }
// };


module.exports = { loginUser, changePassword, getProfile ,verifyCaptcha};
