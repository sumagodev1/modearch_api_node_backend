const GalleryImageDetailsWithImages = require("../models/GalleryImageDetailsWithImages");
const fs = require("fs");
const path = require("path");
// Upload multiple images
const createGalleryImage = async (req, res) => {
  try {
    const {
      gallery_category_id,
      gallery_category,
    } = req.body;

    // Get image file paths
    // const imagePaths = req.files.map((file) => `/uploads/${file.filename}`);
    const imagePaths = req.files.map((file) => `uploads/galleryImages/${file.filename}`);

    // Create gallery entry in the database
    const gallery = await GalleryImageDetailsWithImages.create({
      gallery_category_id,
      gallery_category,
      gallery_images: imagePaths,
    });

    res.status(201).json({ message: "gallery created successfully!", gallery });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all gallerys
const getAllGalleryImages = async (req, res) => {
  try {
    const gallery = await GalleryImageDetailsWithImages.findAll({ where: { isDelete: false } });
    res.status(200).json(gallery);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get single gallery by ID
const getGalleryImageById = async (req, res) => {
  try {
    const { id } = req.params;
    const gallery = await GalleryImageDetailsWithImages.findByPk(id);

    if (!gallery) {
      return res.status(404).json({ message: "gallery not found" });
    }

    res.status(200).json(gallery);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const updateIsActive = async (req, res) => {
  try {
    const { id } = req.params;
    // const { isActive } = req.body;

    const gallery = await GalleryImageDetailsWithImages.findByPk(id);
    if (!gallery) {
      return res.status(404).json({ message: "gallery not found" });
    }

    gallery.isActive = !gallery.isActive; // Update isActive status
    await gallery.save();

    res
      .status(200)
      .json({ message: "isActive status updated successfully", gallery });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateGalleryImageImages = async (req, res) => {
    try {
      const { id } = req.params;
      const { gallery_category_id, gallery_category } = req.body; // Get the updated fields from the body
  
      const gallery = await GalleryImageDetailsWithImages.findByPk(id);
      if (!gallery) {
        return res.status(404).json({ message: "gallery not found" });
      }
  
      // Parse existing images properly (ensure it's always an array)
      let existingImages = gallery.gallery_images;
      if (typeof existingImages === "string") {
        existingImages = JSON.parse(existingImages); // Fix for string issue
      }
      if (!Array.isArray(existingImages)) {
        existingImages = [];
      }
  
      // Get new image paths from uploaded files
      let newImages = req.files.map((file) => `uploads/galleryImages/${file.filename}`);
  
      // Merge old and new images
      const updatedImages = [...existingImages, ...newImages];
  
      // Update the gallery fields
      gallery.gallery_images = updatedImages;
      gallery.gallery_category_id = gallery_category_id; // Update the category ID
      gallery.gallery_category = gallery_category; // Update the category name
  
      await gallery.save();
  
      res.status(200).json({ message: "Gallery updated successfully", gallery });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  
  
  // const deleteGalleryImageImage = async (req, res) => {
  //   try {
  //     const { id } = req.params;
  //     const { imagePath } = req.body; // The image URL to delete
  
  //     const gallery = await GalleryImageDetailsWithImages.findByPk(id);
  //     if (!gallery) {
  //       return res.status(404).json({ message: "gallery not found" });
  //     }
  
  //     // Parse the stringified JSON array into an actual array
  //     let images = [];
  //     try {
  //       images = JSON.parse(gallery.gallery_images);
  //     } catch (error) {
  //       return res.status(500).json({ message: "Error parsing images" });
  //     }
  
  //     // Normalize the imagePath format to match the stored paths
  //     const normalizedImagePath = imagePath.startsWith('/') ? imagePath : `${imagePath}`;
  
  //     // Check if the image exists in the gallery
  //     console.log(normalizedImagePath)
  //     if (!images.includes(normalizedImagePath)) {
  //       return res.status(400).json({ message: "Image not found in gallery" });
  //     }
  
  //     // Remove the image from the array
  //     gallery.gallery_images = images.filter((img) => img !== normalizedImagePath);
  
  //     // Delete the image from the server
  //   //   const fullPath = path.join(__dirname, "..", normalizedImagePath);
  //   const fullPath = path.join(__dirname, "..", "uploads/galleryImages", path.basename(normalizedImagePath));


  //     if (fs.existsSync(fullPath)) {
  //       fs.unlinkSync(fullPath); // Delete file
  //     }
  
  //     await gallery.save();
  //     res.status(200).json({ message: "Image deleted successfully", gallery });
  //   } catch (error) {
  //     res.status(500).json({ error: error.message });
  //   }
  // };
  

// Update isDelete status


const deleteGalleryImageImage = async (req, res) => {
  try {
      const { id } = req.params;
      const { imagePath } = req.body; // The image URL to delete

      const gallery = await GalleryImageDetailsWithImages.findByPk(id);
      if (!gallery) {
          return res.status(404).json({ message: "Gallery not found" });
      }

      // Ensure gallery_images is always an array
      let images = [];
      if (typeof gallery.gallery_images === "string") {
          try {
              images = JSON.parse(gallery.gallery_images);
          } catch (error) {
              return res.status(500).json({ message: "Error parsing gallery images" });
          }
      } else if (Array.isArray(gallery.gallery_images)) {
          images = gallery.gallery_images;
      }

      // Normalize the imagePath format to match stored paths
      const normalizedImagePath = imagePath.startsWith("/")
          ? imagePath.substring(1) // Remove leading slash if present
          : imagePath;

      // Check if the image exists in the gallery
      if (!images.includes(normalizedImagePath)) {
          return res.status(400).json({ message: "Image not found in gallery" });
      }

      // Remove the image from the array
      gallery.gallery_images = images.filter((img) => img !== normalizedImagePath);

      // Construct the correct file path for deletion
      const fullPath = path.join(__dirname, "..", "uploads/galleryImages", path.basename(normalizedImagePath));

      // Check if the file exists before attempting to delete it
      if (fs.existsSync(fullPath)) {
          fs.unlinkSync(fullPath); // Delete file
      }

      // Save the updated gallery entry
      await gallery.save();

      res.status(200).json({ message: "Image deleted successfully", gallery });
  } catch (error) {
      res.status(500).json({ error: error.message || "Something went wrong" });
  }
};

const updateIsDelete = async (req, res) => {
  try {
    const { id } = req.params;
    // const { isDelete } = req.body;

    const gallery = await GalleryImageDetailsWithImages.findByPk(id);
    if (!gallery) {
      return res.status(404).json({ message: "gallery not found" });
    }

    gallery.isDelete = !gallery.isDelete;  // Update isDelete status
    await gallery.save();

    res
      .status(200)
      .json({ message: "isDelete status updated successfully", gallery });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createGalleryImage,
  getAllGalleryImages,
  getGalleryImageById,
  updateIsActive,
  updateIsDelete,deleteGalleryImageImage,updateGalleryImageImages
};
