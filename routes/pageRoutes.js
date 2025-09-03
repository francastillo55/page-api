const express = require("express");
const router = express.Router();
const {
  authenticateUser,
  authorizePermissions,
} = require("../middleware/authentication");

const {
  createPage,
  getAllPages,
  getSinglePage,
  updatePage,
  deletePage,
  getUserPages,
  getContentAndMeta,
} = require("../controllers/pageController");

//router.route("/").post(createPage);
router.route("/").post(authenticateUser, createPage).get(getAllPages);

router.route("/user/:type").get(authenticateUser, getUserPages);
router.route("/user/:type/full").get(authenticateUser, getContentAndMeta);
router
  .route("/:id")
  .get(authenticateUser, getSinglePage)
  .patch(authenticateUser, updatePage)
  .delete(authenticateUser, deletePage);

module.exports = router;
