const express = require("express");
const router = express.Router();
const upload = require("../middleware/multerformultigalleryimages");
const {
  createGalleryImage,
  getAllGalleryImages,
  getGalleryImageById,
  updateIsActive,
  updateGalleryImageImages,deleteGalleryImageImage,
  updateIsDelete,
} = require("../controllers/GalleryImageDetailsWithImagesController");

// Create a GalleryImage with multiple images
router.post(
  "/create-galleryImageDetailsWithImages",
  upload.array("gallery_images"),
  createGalleryImage
);

// Get all GalleryImages
router.get("/galleryImages", getAllGalleryImages);

// Get a single GalleryImage by ID
router.get("/galleryImages/:id", getGalleryImageById);

router.put("/galleryImages/:id/is-active", updateIsActive);

// Update isDelete status
router.delete("/galleryImages/:id/is-delete", updateIsDelete);

router.put(
  "/galleryImages/:id/images",
  upload.array("gallery_images"),
  updateGalleryImageImages
);

// Delete a specific image
router.delete("/galleryImages/:id/delete-image", deleteGalleryImageImage);
module.exports = router;
