const express = require("express");
const { body } = require("express-validator");
const {
  adminLogin,
  getAllOrders,
  updateOrderStatus,
  getDashboardStats,
} = require("../controllers/adminController");
const { adminAuth } = require("../middleware/adminAuth");

const router = express.Router();

// Login validation
const loginValidation = [
  body("username").notEmpty().withMessage("Username is required"),
  body("password").notEmpty().withMessage("Password is required"),
];

// Public routes
router.post("/login", loginValidation, adminLogin);

// Protected admin routes
router.get("/orders", adminAuth, getAllOrders);
router.put("/orders/:id/status", adminAuth, updateOrderStatus);
router.get("/stats", adminAuth, getDashboardStats);

module.exports = router;
