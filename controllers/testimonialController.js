const Testimonial = require("../models/Testimonial");
const apiResponse = require("../helper/apiResponse");

exports.addTestimonial = async (req, res) => {
  try {
    const { name, experience, company_Name, review, star } = req.body;
    const img = req.file ? req.file.path : null;

    const testimonial = await Testimonial.create({
      img,
      name,
      experience,
      company_Name,
      review,
      star,
      isActive: true,
      isDelete: false,
    });
    return apiResponse.successResponseWithData(
      res,
      "Testimonial added successfully",
      testimonial
    );
  } catch (error) {
    console.error("Add testimonial failed", error);
    return apiResponse.ErrorResponse(res, "Add testimonial failed");
  }
};

exports.updateTestimonial = async (req, res) => {
  try {
    const { id } = req.params;
    const { review, star,name,experience,company_Name } = req.body;
    const img = req.file ? req.file.path : null;

    const testimonial = await Testimonial.findByPk(id);
    if (!testimonial) {
      return apiResponse.notFoundResponse(res, "Testimonial not found");
    }

    testimonial.img = img || testimonial.img;
    testimonial.name = name;
    testimonial.experience = experience;
    testimonial.company_Name = company_Name;
    testimonial.review = review;
    testimonial.star = star;
    await testimonial.save();

    return apiResponse.successResponseWithData(
      res,
      "Testimonial updated successfully",
      testimonial
    );
  } catch (error) {
    console.error("Update testimonial failed", error);
    return apiResponse.ErrorResponse(res, "Update testimonial failed");
  }
};

exports.getTestimonials = async (req, res) => {
  try {
    const testimonials = await Testimonial.findAll({
      where: { isDelete: false },
    });

    // Base URL for images
    const baseUrl = `${process.env.SERVER_PATH}`;
        console.log("baseUrl....", baseUrl);
    const testimonialsWithBaseUrl = testimonials.map((testimonial) => {
      console.log("testimonial.img", testimonial.img);
      return {
        ...testimonial.toJSON(), // Convert Sequelize instance to plain object
        img: testimonial.img
          ? baseUrl + testimonial.img.replace(/\\/g, "/")
          : null,
      };
    });

    return apiResponse.successResponseWithData(
      res,
      "Testimonials retrieved successfully",
      testimonialsWithBaseUrl
    );
  } catch (error) {
    console.error("Get testimonials failed", error);
    return apiResponse.ErrorResponse(res, "Get testimonials failed");
  }
};

exports.isActiveStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const testimonial = await Testimonial.findByPk(id);

    if (!testimonial) {
      return apiResponse.notFoundResponse(res, "Testimonial not found");
    }

    testimonial.isActive = !testimonial.isActive;
    await testimonial.save();

    return apiResponse.successResponseWithData(
      res,
      "Testimonial status updated successfully",
      testimonial
    );
  } catch (error) {
    console.error("Toggle testimonial status failed", error);
    return apiResponse.ErrorResponse(res, "Toggle testimonial status failed");
  }
};

exports.isDeleteStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const testimonial = await Testimonial.findByPk(id);

    if (!testimonial) {
      return apiResponse.notFoundResponse(res, "Testimonial not found");
    }

    testimonial.isDelete = !testimonial.isDelete;
    await testimonial.save();

    return apiResponse.successResponseWithData(
      res,
      "Testimonial delete status updated successfully",
      testimonial
    );
  } catch (error) {
    console.error("Toggle testimonial delete status failed", error);
    return apiResponse.ErrorResponse(
      res,
      "Toggle testimonial delete status failed"
    );
  }
};
