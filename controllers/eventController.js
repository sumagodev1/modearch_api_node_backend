// controllers/eventController.js
const Event = require('../models/Event');
const apiResponse = require('../helper/apiResponse');
const { validationResult } = require('express-validator');

exports.addEvent = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return apiResponse.ErrorResponse(res, errors.array().map(err => err.msg).join(', '));
  }

  try {
    const { name } = req.body;
    const img = req.file ? req.file.path : null;

    const event = await Event.create({
      name,
      img,
      isActive: true,
      isDelete: false,
    });

    return apiResponse.successResponseWithData(
      res,
      'Event added successfully',
      event
    );
  } catch (error) {
    console.error('Add event failed', error);
    return apiResponse.ErrorResponse(res, 'Add event failed');
  }
};

exports.updateEvent = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return apiResponse.ErrorResponse(res, errors.array().map(err => err.msg).join(', '));
  }

  try {
    const { id } = req.params;
    const { name } = req.body;
    const img = req.file ? req.file.path : null;

    const event = await Event.findByPk(id);
    if (!event) {
      return apiResponse.notFoundResponse(res, 'Event not found');
    }

    event.img = img || event.img;
    event.name = name;
    await event.save();

    return apiResponse.successResponseWithData(
      res,
      'Event updated successfully',
      event
    );
  } catch (error) {
    console.error('Update event failed', error);
    return apiResponse.ErrorResponse(res, 'Update event failed');
  }
};

exports.getEvents = async (req, res) => {
  try {
    const events = await Event.findAll({ where: { isDelete: false } });

    const baseUrl = `${process.env.SERVER_PATH}`;
        const eventsWithBaseUrl = events.map(event => ({
      ...event.toJSON(),
      img: event.img ? baseUrl + event.img.replace(/\\/g, '/') : null,
    }));

    return apiResponse.successResponseWithData(
      res,
      'Events retrieved successfully',
      eventsWithBaseUrl
    );
  } catch (error) {
    console.error('Get events failed', error);
    return apiResponse.ErrorResponse(res, 'Get events failed');
  }
};

exports.isActiveStatusEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const event = await Event.findByPk(id);

    if (!event) {
      return apiResponse.notFoundResponse(res, 'Event not found');
    }

    event.isActive = !event.isActive;
    await event.save();

    return apiResponse.successResponseWithData(
      res,
      'Event active status updated successfully',
      event
    );
  } catch (error) {
    console.error('Toggle event active status failed', error);
    return apiResponse.ErrorResponse(res, 'Toggle event active status failed');
  }
};

exports.isDeleteStatusEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const event = await Event.findByPk(id);

    if (!event) {
      return apiResponse.notFoundResponse(res, 'Event not found');
    }

    event.isDelete = !event.isDelete;
    await event.save();

    return apiResponse.successResponseWithData(
      res,
      'Event delete status updated successfully',
      event
    );
  } catch (error) {
    console.error('Toggle event delete status failed', error);
    return apiResponse.ErrorResponse(res, 'Toggle event delete status failed');
  }
};
