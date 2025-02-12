// routes/optionsDataRoutes.js
const express = require("express");
const {
  addOptionsData,
  updateOptionsData,
  getOptionsData,
  deleteOptionsData,
} = require("../controllers/optionsDataController");
const authenticateToken = require("../middleware/auth");

const router = express.Router();

router.post("/create-optionsdata", authenticateToken, addOptionsData);
router.put("/update-optionsdata/:id", authenticateToken, updateOptionsData);
router.get("/get-optionsdata", authenticateToken, getOptionsData);
router.delete("/delete-optionsdata/:id",authenticateToken,deleteOptionsData);
module.exports = router;
