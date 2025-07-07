require("dotenv").config();
const connectDB = require("../config/database");
const { seedCategories } = require("./categories");
const { seedProducts } = require("./products");

const seedDatabase = async () => {
  try {
    // Connect to database
    await connectDB();

    console.log("🌱 Starting database seeding...");

    // Seed categories first (products depend on categories)
    console.log("📂 Seeding categories...");
    await seedCategories();

    // Seed products
    console.log("📦 Seeding products...");
    await seedProducts();

    console.log("✅ Database seeding completed successfully!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Database seeding failed:", error);
    process.exit(1);
  }
};

// Handle unhandled promise rejections
process.on("unhandledRejection", (err) => {
    console.error("❌ Unhandled Promise Rejection:", err.message);
    process.exit(1);
  });

// Run seeder if this file is executed directly
if (require.main === module) {
  seedDatabase();
}

module.exports = seedDatabase;
