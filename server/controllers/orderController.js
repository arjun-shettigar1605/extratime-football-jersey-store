const Order = require("../models/Order");
const Product = require("../models/Product");
const razorpay = require("../config/razorpay");
const crypto = require("crypto");

// @desc    Create Razorpay order
// @route   POST /api/orders/create-payment
// @access  Private
const createPaymentOrder = async (req, res) => {
  try {
    const { amount, currency = "INR" } = req.body;
    const amountInPaise = Math.round(parseFloat(amount)*100);
    console.log("Original amount:", amount);
    console.log("Amount in paise:", amountInPaise);

    const options = {
      amount: amountInPaise, // Razorpay expects amount in paise
      currency,
      receipt: `receipt_${Date.now()}`,
      payment_capture: 1,
    };

    const razorpayOrder = await razorpay.orders.create(options);

    res.json({
      success: true,
      orderId: razorpayOrder.id,
      amount: razorpayOrder.amount,
      currency: razorpayOrder.currency,
      key: process.env.RAZORPAY_KEY_ID,
    });
  } catch (error) {
    console.error("Create payment order error:", error);
    res.status(500).json({ message: "Failed to create payment order" });
  }
};

// @desc    Verify payment and create order
// @route   POST /api/orders/verify-payment
// @access  Private
const verifyPaymentAndCreateOrder = async (req, res) => {
  try {
    const { 
      razorpayOrderId, 
      razorpayPaymentId, 
      razorpaySignature, 
      orderData 
    } = req.body;

    // Verify Razorpay signature
    const body = razorpayOrderId + "|" + razorpayPaymentId;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest("hex");

    if (expectedSignature !== razorpaySignature) {
      return res.status(400).json({ message: "Invalid payment signature" });
    }


    let appliedCouponData = null;
    if (orderData.appliedCoupon) {
      appliedCouponData = {
        code: orderData.appliedCoupon.code || null,
        discount: orderData.appliedCoupon.discount || 0,
        type: orderData.appliedCoupon.type || null,
        description: orderData.appliedCoupon.description || null,
      };
    }

    console.log("Creating order with data:", {
      userId: req.user._id,
      itemsCount: orderData.items.length,
      appliedCoupon: appliedCouponData,
      total: orderData.pricing.total,
    });


    // Create order in database
    const order = await Order.create({
      user: req.user._id,
      items: orderData.items,
      shippingAddress: orderData.shippingAddress,
      paymentInfo: {
        method: "razorpay",
        razorpayOrderId,
        razorpayPaymentId,
        razorpaySignature,
        status: "completed",
      },
      pricing: orderData.pricing,
      appliedCoupon: appliedCouponData,
      status: "confirmed",
    });

    // Populate the order with product details
    const populatedOrder = await Order.findById(order._id)
      .populate("user", "name email")
      .populate("items.product", "title images");

    // Update product stock
    for (const item of orderData.items) {
      await Product.findByIdAndUpdate(item.product, {
        $inc: { stock: -item.quantity },
      });
    }

    res.json({
      success: true,
      message: "Order created successfully",
      order: populatedOrder,
    });
  } catch (error) {
    console.error("Verify payment error:", error);
    res
      .status(500)
      .json({ message: "Failed to verify payment and create order" });
  }
};

// @desc    Get user orders
// @route   GET /api/orders/my-orders
// @access  Private
const getUserOrders = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const orders = await Order.find({ user: req.user._id })
      .populate("items.product", "title images")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Order.countDocuments({ user: req.user._id });

    res.json({
      orders,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalOrders: total,
        hasNext: page * limit < total,
        hasPrev: page > 1,
      },
    });
  } catch (error) {
    console.error("Get user orders error:", error);
    res.status(500).json({ message: "Failed to fetch orders" });
  }
};

// @desc    Get single order
// @route   GET /api/orders/:id
// @access  Private
const getOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate("user", "name email")
      .populate("items.product", "title images");

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Check if order belongs to user
    if (order.user._id.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ message: "Not authorized to view this order" });
    }

    res.json(order);
  } catch (error) {
    console.error("Get order error:", error);
    res.status(500).json({ message: "Failed to fetch order" });
  }
};

module.exports = {
  createPaymentOrder,
  verifyPaymentAndCreateOrder,
  getUserOrders,
  getOrder,
};
