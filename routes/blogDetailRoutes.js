const express = require('express');
const { upload } = require('../middleware/multer');
const {
  addBlogDetail,
  updateBlogDetail,
  getBlogDetails,
  isActiveStatus,
  isDeleteStatus,
} = require('../controllers/blogDetailController');
const authenticateToken = require('../middleware/auth');

const router = express.Router();

// upload.single('img') 

router.post('/create-blogdetail', upload.fields([ { name: "img", maxCount: 1 }, { name: "img2", maxCount: 1 },]), authenticateToken, addBlogDetail);
router.put('/update-blogdetail/:id', upload.fields([ { name: "img", maxCount: 1 }, { name: "img2", maxCount: 1 },]), authenticateToken, updateBlogDetail);
router.get('/get-blogdetails', getBlogDetails);
router.get('/find-blogdetails',authenticateToken, getBlogDetails);
router.put('/isactive-blogdetail/:id', authenticateToken, isActiveStatus);
router.delete ('/isdelete-blogdetail/:id', authenticateToken, isDeleteStatus);

module.exports = router;
