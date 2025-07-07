const express = require("express");
const {
  createPaymentOrder,
  verifyPaymentAndCreateOrder,
  getUserOrders,
  getOrder,
} = require("../controllers/orderController");
const { protect } = require("../middleware/auth");

const router = express.Router();

// All routes are protected
router.use(protect);

router.post("/create-payment", createPaymentOrder);
router.post("/verify-payment", verifyPaymentAndCreateOrder);
router.get("/my-orders", getUserOrders);
router.get("/:id", getOrder);

module.exports = router;
