const Category = require("../models/Category");

//Get all categories
//route   GET /api/categories
//Public access
const getCategories = async (req, res) => {
  try {
    const categories = await Category.find({ isActive: true }).sort({
      name: 1,    //fetching active categories srted alphabetically by name
    });
    res.json(categories);
  } catch (error) {
    console.error("Get categories error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Get category by slug
// @route   GET /api/categories/:slug
// @access  Public
const getCategoryBySlug = async (req, res) => {   //when user clicks on a category, the frontend fetches and display all the prods in that category
  try {
    const category = await Category.findOne({   //looks for single category where slug matches with URL slg and category is marked active
      slug: req.params.slug,
      isActive: true,
    });

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.json(category);
  } catch (error) {
    console.error("Get category error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  getCategories,
  getCategoryBySlug,
};
