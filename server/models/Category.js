const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(  //schema for categorys
  {
    name: {
      type: String,
      required: [true, "Category name is required"],
      unique: true,
      trim: true,
    },
    slug: {  //URL friendly name
      type: String,
      required: [true, "Category slug is required"],
      unique: true,
      lowercase: true,  //auto convert to lowercase
    },
    description: {
      type: String,
      trim: true,
    },
    image: {
      type: String,
      default: "",
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,  //adds createdAt and updatedAt automatically
  }
);

module.exports = mongoose.model("Category", categorySchema);
