const Category = require("../models/Category");

const categories = [
  {
    name: "2024-25 Jerseys",
    slug: "2024-25-jerseys",
    description: "Latest season football jerseys from top teams",
    image:
      "https://via.placeholder.com/300x200/3B82F6/FFFFFF?text=2024-25+Jerseys",
  },
  {
    name: "Retro Jerseys",
    slug: "retro-jerseys",
    description: "Classic vintage football jerseys",
    image:
      "https://via.placeholder.com/300x200/10B981/FFFFFF?text=Retro+Jerseys",
  },
  {
    name: "Anthem Jackets",
    slug: "anthem-jackets",
    description: "Official team anthem jackets and warmup gear",
    image:
      "https://via.placeholder.com/300x200/8B5CF6/FFFFFF?text=Anthem+Jackets",
  },
  {
    name: "Full Sleeves Jerseys",
    slug: "full-sleeves-jerseys",
    description: "Long sleeve football jerseys for all weather",
    image:
      "https://via.placeholder.com/300x200/F59E0B/FFFFFF?text=Full+Sleeves",
  },
  {
    name: "Football Shoes",
    slug: "football-shoes",
    description: "Professional football boots and cleats",
    image:
      "https://via.placeholder.com/300x200/EF4444/FFFFFF?text=Football+Shoes",
  },
];

const seedCategories = async () => {
  try {
    // Clear existing categories
    await Category.deleteMany({});

    // Insert new categories
    const createdCategories = await Category.insertMany(categories);
    console.log(`✅ Created ${createdCategories.length} categories`);

    return createdCategories;
  } catch (error) {
    console.error("❌ Error seeding categories:", error);
    throw error;
  }
};

module.exports = { seedCategories, categories };
