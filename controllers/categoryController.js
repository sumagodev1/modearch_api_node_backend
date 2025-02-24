const apiResponse = require("../helper/apiResponse");
const Category = require("../models/Category");
exports.addCategory = async (req, res) => {
  try {
    const { title, desc } = req.body;

    const Category1 = await Category.create({
      title,
      isActive: true,
      isDelete: false,
    });
    return apiResponse.successResponseWithData(
      res,
      "Category added successfully",
      Category1
    );
  } catch (error) {
    console.error("Add Category failed", error);
    return apiResponse.ErrorResponse(res, "Add Category failed");
  }
};

exports.updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, desc } = req.body;

    const Category1 = await Category.findByPk(id);
    if (!Category1) {
      return apiResponse.notFoundResponse(res, "Category not found");
    }

    Category1.title = title;
    await Category1.save();

    return apiResponse.successResponseWithData(
      res,
      "Category updated successfully",
      Category1
    );
  } catch (error) {
    console.error("Update Category failed", error);
    return apiResponse.ErrorResponse(res, "Update Category failed");
  }
};

exports.getCategory = async (req, res) => {
  try {
    const Category1 = await Category.findAll({
      where: { isDelete: false },
    });

    // Base URL for images
    // const baseUrl = `${process.env.SERVER_PATH}`; // Adjust according to your setup
    // console.log("baseUrl....", baseUrl);
    // const CategoryWithBaseUrl = Category.map((Category) => {
    //   console.log("Category.img", Category.img);
    //   return {
    //     ...Category.toJSON(), // Convert Sequelize instance to plain object
    //     img: Category.img
    //       ? baseUrl + Category.img.replace(/\\/g, "/")
    //       : null,
    //   };
    // });

    return apiResponse.successResponseWithData(
      res,
      "Category retrieved successfully",
      Category1
    );
  } catch (error) {
    console.error("Get Category failed", error);
    return apiResponse.ErrorResponse(res, "Get Category failed");
  }
};

exports.isActiveStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const Category1 = await Category.findByPk(id);

    if (!Category1) {
      return apiResponse.notFoundResponse(res, "Category not found");
    }

    Category1.isActive = !Category1.isActive;
    await Category1.save();

    return apiResponse.successResponseWithData(
      res,
      "Category status updated successfully",
      Category1
    );
  } catch (error) {
    console.error("Toggle Category status failed", error);
    return apiResponse.ErrorResponse(
      res,
      "Toggle Category status failed"
    );
  }
};

exports.isDeleteStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const Category1 = await Category.findByPk(id);

    if (!Category1) {
      return apiResponse.notFoundResponse(res, "Category not found");
    }

    Category1.isDelete = !Category1.isDelete;
    await Category1.save();

    return apiResponse.successResponseWithData(
      res,
      "Category delete status updated successfully",
      Category1
    );
  } catch (error) {
    console.error("Toggle Category delete status failed", error);
    return apiResponse.ErrorResponse(
      res,
      "Toggle Category delete status failed"
    );
  }
};
