const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    orderNumber: {
      type: String,
      unique: true,
    },
    items: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        title: String,
        price: Number,
        quantity: Number,
        selectedSize: String,
        customization: {
          enabled: Boolean,
          playerName: String,
          playerNumber: String,
        },
        unitPrice: Number,
        totalPrice: Number,
      },
    ],
    shippingAddress: {
      fullName: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
      phone: {
        type: String,
        required: true,
      },
      address: {
        type: String,
        required: true,
      },
      city: {
        type: String,
        required: true,
      },
      state: {
        type: String,
        required: true,
      },
      pincode: {
        type: String,
        required: true,
      },
    },
    paymentInfo: {
      method: {
        type: String,
        enum: ["razorpay", "cod"],
        default: "razorpay",
      },
      razorpayOrderId: String,
      razorpayPaymentId: String,
      razorpaySignature: String,
      status: {
        type: String,
        enum: ["pending", "completed", "failed", "refunded"],
        default: "pending",
      },
    },
    pricing: {
      subtotal: {
        type: Number,
        required: true,
      },
      discount: {
        type: Number,
        default: 0,
      },
      shipping: {
        type: Number,
        default: 0,
      },
      total: {
        type: Number,
        required: true,
      },
    },
    appliedCoupon: {
      code: {
        type: String,
        default: null
      },
      discount: {
        type: Number,
        default: 0
      },
      type: {
        type: String,
        default: null
      },
    },
    status: {
      type: String,
      enum: [
        "pending",
        "confirmed",
        "processing",
        "shipped",
        "delivered",
        "cancelled",
      ],
      default: "pending",
    },
    trackingNumber: String,
    notes: String,
  },
  {
    timestamps: true,
  }
);

// Generate order number
orderSchema.pre("save", async function (next) {
  if (!this.orderNumber) {
    try {
      // Generate order number with current timestamp for uniqueness
      const timestamp = Date.now().toString().slice(-6); // Last 6 digits of timestamp
      const randomNum = Math.floor(Math.random() * 1000)
        .toString()
        .padStart(3, "0");
      this.orderNumber = `JFS${timestamp}${randomNum}`;

      // Ensure uniqueness
      const existingOrder = await mongoose
        .model("Order")
        .findOne({ orderNumber: this.orderNumber });
      if (existingOrder) {
        // If duplicate, try again with different random number
        const newRandomNum = Math.floor(Math.random() * 1000)
          .toString()
          .padStart(3, "0");
        this.orderNumber = `JFS${timestamp}${newRandomNum}`;
      }

      console.log("Generated order number:", this.orderNumber);
    } catch (error) {
      console.error("Error generating order number:", error);
    }
  }
  next();
});

module.exports = mongoose.model("Order", orderSchema);
