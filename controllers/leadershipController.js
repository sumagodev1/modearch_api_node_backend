// controllers/leadershipController.js

const Leadership = require("../models/Leadership");
const apiResponse = require("../helper/apiResponse");
require("dotenv").config();
const baseUrl = process.env.SERVER_PATH

exports.addLeadership = async (req, res) => {
  try {
    const { title, designation, description, facebook, instagram, linkedin } =
      req.body;
    const img = req.file ? req.file.path : null;

    const leadership = await Leadership.create({
      title,
      designation,
      description,
      img,
      facebook,
      instagram,
      linkedin,
      isActive: true,
      isDelete: false,
    });

    return apiResponse.successResponseWithData(
      res,
      "Leadership added successfully",
      leadership
    );
  } catch (error) {
    console.error("Add leadership failed", error);
    return apiResponse.ErrorResponse(res, "Add leadership failed");
  }
};

exports.updateLeadership = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, designation, description, facebook, instagram, linkedin } =
      req.body;
    const img = req.file ? req.file.path : null;

    const leadership = await Leadership.findByPk(id);
    if (!leadership) {
      return apiResponse.notFoundResponse(res, "Leadership not found");
    }

    leadership.title = title;
    leadership.designation = designation;
    leadership.description = description;
    leadership.facebook = facebook;
    leadership.instagram = instagram;
    leadership.linkedin = linkedin;
    leadership.img = img || leadership.img;

    await leadership.save();

    return apiResponse.successResponseWithData(
      res,
      "Leadership updated successfully",
      leadership
    );
  } catch (error) {
    console.error("Update leadership failed", error);
    return apiResponse.ErrorResponse(res, "Update leadership failed");
  }
};

exports.getLeadership = async (req, res) => {
    try {
      
      console.log("Base URL:", baseUrl);  // Debugging log
  
      const leadershipData = await Leadership.findAll({
        where: { isDelete: false },
      });
  
      const leadershipWithBaseUrl = leadershipData.map((leader) => {
        return {
          ...leader.toJSON(),
          img: leader.img ? baseUrl + leader.img.replace(/\\/g, "/") : null,
        };
      });
  
      return apiResponse.successResponseWithData(
        res,
        "Leadership entries retrieved successfully",
        leadershipWithBaseUrl
      );
    } catch (error) {
      console.error("Get leadership entries failed", error);
      return apiResponse.ErrorResponse(res, "Get leadership entries failed");
    }
  };

exports.toggleLeadershipStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const leadership = await Leadership.findByPk(id);

    if (!leadership) {
      return apiResponse.notFoundResponse(res, "Leadership not found");
    }

    leadership.isActive = !leadership.isActive;
    await leadership.save();

    return apiResponse.successResponseWithData(
      res,
      "Leadership status updated successfully",
      leadership
    );
  } catch (error) {
    console.error("Toggle leadership status failed", error);
    return apiResponse.ErrorResponse(res, "Toggle leadership status failed");
  }
};

exports.toggleLeadershipDelete = async (req, res) => {
  try {
    const { id } = req.params;
    const leadership = await Leadership.findByPk(id);

    if (!leadership) {
      return apiResponse.notFoundResponse(res, "Leadership not found");
    }

    leadership.isDelete = !leadership.isDelete;
    await leadership.save();

    return apiResponse.successResponseWithData(
      res,
      "Leadership delete status updated successfully",
      leadership
    );
  } catch (error) {
    console.error("Toggle leadership delete status failed", error);
    return apiResponse.ErrorResponse(
      res,
      "Toggle leadership delete status failed"
    );
  }
};
