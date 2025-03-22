const BlogDetail = require("../models/BlogDetail");
const apiResponse = require("../helper/apiResponse");

exports.addBlogDetail = async (req, res) => {
  try {
    const { title, shortDesc, longDesc } = req.body;
    // const img = req.file ? req.file.path : null;
    // const img2 = req.file ? req.file["img2"].path : null;

    const img = req.files?.img ? req.files["img"][0].path : null;
    const img2 = req.files?.img2 ? req.files["img2"][0].path : null;

    const blogDetail = await BlogDetail.create({
      img,
      img2,
      title,
      shortDesc,
      longDesc,
      isActive: true,
      isDelete: false,
    });

    return apiResponse.successResponseWithData(
      res,
      "Blog details added successfully",
      blogDetail
    );
  } catch (error) {
    console.error("Add blog details failed", error);
    return apiResponse.ErrorResponse(res, "Add blog details failed");
  }
};

exports.updateBlogDetail = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, shortDesc, longDesc } = req.body;
    // const img = req.file ? req.file.path : null;
    const img = req.files?.img ? req.files["img"][0].path : null;
    const img2 = req.files?.img2 ? req.files["img2"][0].path : null;

    const blogDetail = await BlogDetail.findByPk(id);
    if (!blogDetail) {
      return apiResponse.notFoundResponse(res, "Blog detail not found");
    }

    blogDetail.img = img || blogDetail.img;
    blogDetail.img2 = img2 || blogDetail.img2;
    blogDetail.title = title;
    blogDetail.shortDesc = shortDesc;
    blogDetail.longDesc = longDesc;
    await blogDetail.save();

    return apiResponse.successResponseWithData(
      res,
      "Blog details updated successfully",
      blogDetail
    );
  } catch (error) {
    console.error("Update blog details failed", error);
    return apiResponse.ErrorResponse(res, "Update blog details failed");
  }
};


exports.getBlogDetails = async (req, res) => {
  try {
    const blogDetails = await BlogDetail.findAll({
      where: { isDelete: false },
      order: [["createdAt", "DESC"]],
    });

    // Base URL for images
    const baseUrl = `${process.env.SERVER_PATH}`;

    const blogDetailsWithBaseUrl = blogDetails.map((blogDetail) => ({
      ...blogDetail.toJSON(), // Convert Sequelize instance to plain object
      img: blogDetail.img ? baseUrl + blogDetail.img.replace(/\\/g, "/") : null,
    }));

    return apiResponse.successResponseWithData(
      res,
      "blogDetails retrieved successfully",
      blogDetailsWithBaseUrl
    );
  } catch (error) {
    console.error("Get blogDetails failed", error);
    return apiResponse.ErrorResponse(res, "Get blogDetails failed");
  }
};


exports.isActiveStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const blogDetail = await BlogDetail.findByPk(id);

    if (!blogDetail) {
      return apiResponse.notFoundResponse(res, "Blog detail not found");
    }

    blogDetail.isActive = !blogDetail.isActive;
    await blogDetail.save();

    return apiResponse.successResponseWithData(
      res,
      "Blog detail active status updated successfully",
      blogDetail
    );
  } catch (error) {
    console.error("Toggle blog detail active status failed", error);
    return apiResponse.ErrorResponse(
      res,
      "Toggle blog detail active status failed"
    );
  }
};

exports.isDeleteStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const blogDetail = await BlogDetail.findByPk(id);

    if (!blogDetail) {
      return apiResponse.notFoundResponse(res, "Blog detail not found");
    }

    blogDetail.isDelete = !blogDetail.isDelete;
    await blogDetail.save();

    return apiResponse.successResponseWithData(
      res,
      "Blog detail delete status updated successfully",
      blogDetail
    );
  } catch (error) {
    console.error("Toggle blog detail delete status failed", error);
    return apiResponse.ErrorResponse(
      res,
      "Toggle blog detail delete status failed"
    );
  }
};
