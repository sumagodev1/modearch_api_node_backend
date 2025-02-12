// controllers/subscribeController.js
const Subscribe = require('../models/Subscribe');
const apiResponse = require('../helper/apiResponse');

// Function to add a new subscriber and set email options for the middleware
exports.addSubscribe = async (req, res, next) => {
  try {
    const { email } = req.body;

    const subscribe = await Subscribe.create({ email });

    // Set email options in the request object
    req.emailOptions = {
      to: process.env.EMAIL_SENT_TO, // Change to your desired notification email
      subject: 'New Subscriber Added',
      text: `A new subscriber with email ${email} has joined.`,
    };
    // Call next middleware to send the email
    next();

    return apiResponse.successResponseWithData(res, 'Subscription added successfully', subscribe);
  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      console.error('Add subscription failed: Email already exists');
      return apiResponse.conflictResponse(res, 'Email already subscribed');
    }
    console.error('Add subscription failed', error);
    return apiResponse.ErrorResponse(res, 'Add subscription failed');
  }
};

// Function to retrieve all active (not deleted) subscribers
exports.getSubscribes = async (req, res) => {
  try {
    const subscribes = await Subscribe.findAll({ where: { isDelete: false } });
    return apiResponse.successResponseWithData(res, 'Subscriptions retrieved successfully', subscribes);
  } catch (error) {
    console.error('Get subscriptions failed', error);
    return apiResponse.ErrorResponse(res, 'Get subscriptions failed');
  }
};

// Function to update a subscriber's email
exports.updateSubscribe = async (req, res) => {
  try {
    const { id } = req.params;
    const { email } = req.body;

    const subscribe = await Subscribe.findByPk(id);
    if (!subscribe) {
      return apiResponse.notFoundResponse(res, 'Subscription not found');
    }

    subscribe.email = email;
    await subscribe.save();

    return apiResponse.successResponseWithData(res, 'Subscription updated successfully', subscribe);
  } catch (error) {
    console.error('Update subscription failed', error);
    return apiResponse.ErrorResponse(res, 'Update subscription failed');
  }
};

// Function to soft delete a subscriber
exports.deleteSubscribe = async (req, res) => {
  try {
    const { id } = req.params;
    const subscribe = await Subscribe.findByPk(id);

    if (!subscribe) {
      return apiResponse.notFoundResponse(res, 'Subscription not found');
    }

    subscribe.isDelete = true;
    await subscribe.save();

    return apiResponse.successResponseWithData(res, 'Subscription deleted successfully', subscribe);
  } catch (error) {
    console.error('Delete subscription failed', error);
    return apiResponse.ErrorResponse(res, 'Delete subscription failed');
  }
};
