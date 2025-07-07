const Product = require("../models/Product");
const Category = require("../models/Category");

//Get all products with filtering/searching, etc
//route GET /api/products
//access: Public
const getProducts = async (req, res) => {  //finds products based on filter and returns list of products
  try {
    const {
      category,
      search,
      minPrice,
      maxPrice,
      sort = "createdAt",
      order = "desc",
      page = 1,
      limit = 12,
    } = req.query;

    //filter object which fetches only active productS
    const filter = { isActive: true };

    // Category filter(if category slug is provided)
    if (category) {
      const categoryDoc = await Category.findOne({ slug: category });
      if (categoryDoc) {
        filter.category = categoryDoc._id;
      }
    }

    // Price range filter(adds a price range to products)
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    // Search filter
    if (search) {
      filter.$text = { $search: search };
    }

    // Sort options
    const sortOptions = {};
    sortOptions[sort] = order === "desc" ? -1 : 1;

    // Pagination
    const skip = (page  - 1) * limit;

    const products = await Product.find(filter)
      .populate("category", "name slug")
      .sort(sortOptions)
      .skip(skip)
      .limit(Number(limit));

    const total = await Product.countDocuments(filter);

    res.json({
      products,
      pagination: {
        currentPage: Number(page),
        totalPages: Math.ceil(total / limit),
        totalProducts: total,
        hasNext: page * limit < total,
        hasPrev: page > 1,
      },
    });
  } catch (error) {
    console.error("Get products error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

//Get single product by ID
//route: GET /api/products/:id
//access: Public
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate(    //looks up the product by its id, populates the category with name and slug
      "category",
      "name slug"
    );

    if (!product || !product.isActive) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(product);
  } catch (error) {
    console.error("Get product error:", error);
    if (error.name === "CastError") {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(500).json({ message: "Server error" });
  }
};

//Get products by category
//route GET /api/products/category/:slug
//access  Public
const getProductsByCategory = async (req, res) => {
  try {
    const { slug } = req.params;
    const {
      sort = "createdAt",
      order = "desc",
      page = 1,
      limit = 12,
    } = req.query;

    // Find category
    const category = await Category.findOne({ slug, isActive: true });
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    // Build filter
    const filter = { category: category._id, isActive: true };

    // Sort options
    const sortOptions = {};
    sortOptions[sort] = order === "desc" ? -1 : 1;   //-1 for descending, 1 for ascending
 
    // Pagination
    const skip = (page - 1) * limit;

    const products = await Product.find(filter)
      .populate("category", "name slug")
      .sort(sortOptions)
      .skip(skip)
      .limit(Number(limit));

    const total = await Product.countDocuments(filter);

    res.json({
      category,
      products,
      pagination: {
        currentPage: Number(page),
        totalPages: Math.ceil(total / limit),
        totalProducts: total,
        hasNext: page * limit < total,
        hasPrev: page > 1,
      },
    });
  } catch (error) {
    console.error("Get products by category error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  getProducts,
  getProductById,
  getProductsByCategory,
};
