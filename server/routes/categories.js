//defines API endpoints for categories

const express = require("express");
const {
  getCategories,
  getCategoryBySlug,
} = require("../controllers/categoryController");

const router = express.Router();

router.get("/", getCategories); //displays all categories
router.get("/:slug", getCategoryBySlug);  //loads products based on slug

module.exports = router;
