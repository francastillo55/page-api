const express = require("express");
const router = express.Router();
const {
  authenticateUser,
  authorizePermissions,
} = require("../middleware/authentication");

const {
  uploadImage,
  getUserImages,
  deleteImage,
} = require("../controllers/imageController");

//router.route("/").post(createPage);
router.route("/").post(authenticateUser, uploadImage);

router.route("/user").get(authenticateUser, getUserImages);
router.route("/:id").delete(authenticateUser, deleteImage);
// router
//   .route("/:id")
//   .get(authenticateUser, getSinglePage)
//   .patch(authenticateUser, updatePage)
//   .delete(authenticateUser, deletePage);

module.exports = router;
