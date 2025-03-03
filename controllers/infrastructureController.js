const Infrastructure = require('../models/Infrastructure');
const apiResponse = require('../helper/apiResponse');

exports.addInfrastructure = async (req, res) => {
  try {
    const { title, subtitle, desc } = req.body;
    const img = req.file ? req.file.path : null;

    const infrastructure = await Infrastructure.create({ img, title, subtitle, desc, isActive: true, isDelete: false });
    return apiResponse.successResponseWithData(res, 'Infrastructure added successfully', infrastructure);
  } catch (error) {
    console.error('Add infrastructure failed', error);
    return apiResponse.ErrorResponse(res, 'Add infrastructure failed');
  }
};

exports.updateInfrastructure = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, subtitle, desc } = req.body;
    const img = req.file ? req.file.path : null;

    const infrastructure = await Infrastructure.findByPk(id);
    if (!infrastructure) {
      return apiResponse.notFoundResponse(res, 'Infrastructure not found');
    }

    infrastructure.img = img || infrastructure.img;
    infrastructure.title = title;
    infrastructure.subtitle = subtitle;
    infrastructure.desc = desc;
    await infrastructure.save();

    return apiResponse.successResponseWithData(res, 'Infrastructure updated successfully', infrastructure);
  } catch (error) {
    console.error('Update infrastructure failed', error);
    return apiResponse.ErrorResponse(res, 'Update infrastructure failed');
  }
};

exports.getInfrastructure = async (req, res) => {
  try {
    const infrastructure = await Infrastructure.findAll({ where: { isDelete: false } });
    
    // Base URL for images
    const baseUrl = `${process.env.SERVER_PATH}`; // Adjust according to your setup
    console.log("baseUrl....", baseUrl);
    const infrastructureWithBaseUrl = infrastructure.map(infrastructure => {
      console.log("infrastructure.img", infrastructure.img);
      return {
        ...infrastructure.toJSON(), // Convert Sequelize instance to plain object
        img: infrastructure.img ? baseUrl + infrastructure.img.replace(/\\/g, '/') : null 
      };
    });

    return apiResponse.successResponseWithData(res, 'Infrastructure retrieved successfully', infrastructureWithBaseUrl);
  } catch (error) {
    console.error('Get Infrastructure failed', error);
    return apiResponse.ErrorResponse(res, 'Get Infrastructure failed');
  }
};

exports.isActiveStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const infrastructure = await Infrastructure.findByPk(id);

    if (!infrastructure) {
      return apiResponse.notFoundResponse(res, 'Infrastructure not found');
    }

    infrastructure.isActive = !infrastructure.isActive;
    await infrastructure.save();

    return apiResponse.successResponseWithData(res, 'Infrastructure status updated successfully', infrastructure);
  } catch (error) {
    console.error('Toggle infrastructure status failed', error);
    return apiResponse.ErrorResponse(res, 'Toggle infrastructure status failed');
  }
};

exports.isDeleteStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const infrastructure = await Infrastructure.findByPk(id);

    if (!infrastructure) {
      return apiResponse.notFoundResponse(res, 'Infrastructure not found');
    }

    infrastructure.isDelete = !infrastructure.isDelete;
    await infrastructure.save();

    return apiResponse.successResponseWithData(res, 'Infrastructure delete status updated successfully', infrastructure);
  } catch (error) {
    console.error('Toggle infrastructure delete status failed', error);
    return apiResponse.ErrorResponse(res, 'Toggle infrastructure delete status failed');
  }
};
