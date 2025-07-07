const mongoose = require("mongoose");
  
const productSchema = new mongoose.Schema( //Schema for productS
  {
    title: {
      type: String,
      required: [true, "Product title is required"],
      trim: true,
      maxlength: [100, "Title cannot exceed 100 characters"],
    },
    description: {
      type: String,
      required: [true, "Product description is required"],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, "Product price is required"],
      min: [0, "Price cannot be negative"],
    },
    originalPrice: {
      type: Number,
      min: [0, "Original price cannot be negative"],
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: [true, "Product category is required"],
    },
    images: [
      {
        type: String,
        required: true,
      },
    ],
    sizes: [
      {
        type: String,
        enum: [
          "XS",
          "S",
          "M",
          "L",
          "XL",
          "XXL",
          "6",
          "7",
          "8",
          "9",
          "10",
          "11",
          "12",
        ],
        required: true,
      },
    ],
    colors: [
      {
        type: String,
        default: ["Default"],
      },
    ],
    stock: {
      type: Number,
      required: [true, "Stock quantity is required"],
      min: [0, "Stock cannot be negative"],
      default: 0,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    tags: [
      {
        type: String,
        lowercase: true,
      },
    ],
    customizable: {
      type: Boolean,
      default: false,
    },
    customizationPrice: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);


productSchema.index({ title: "text", description: "text" });  //Text index for search feature
productSchema.index({ category: 1, isActive: 1 });
productSchema.index({ price: 1 });

module.exports = mongoose.model("Product", productSchema);
