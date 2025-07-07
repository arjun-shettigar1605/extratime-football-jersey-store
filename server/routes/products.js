const express = require("express");
// const { model } = require("mongoose");
const { getProducts, getProductById, getProductsByCategory } = require('../controllers/productController');

const router = express.Router();

router.get('/', getProducts);
router.get('/category/:slug', getProductsByCategory);
router.get('/:id', getProductById)

module.exports = router