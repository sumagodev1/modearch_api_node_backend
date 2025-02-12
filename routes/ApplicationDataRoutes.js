const express = require("express");
const {
  addApplicationData,
  updateApplicationData,
  getApplicationData,
  deleteApplicationData,
} = require("../controllers/applicationDataController");
const authenticateToken = require("../middleware/auth");

const router = express.Router();

router.post("/create-applicationdata", authenticateToken, addApplicationData);
router.put("/update-applicationdata/:id", authenticateToken, updateApplicationData);
router.get("/get-applicationdata", authenticateToken, getApplicationData);
router.delete("/delete-applicationdata/:id", authenticateToken, deleteApplicationData);

module.exports = router;
