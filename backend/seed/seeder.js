/**
 * Seeder Script
 * -------------
 * Run:  node seed/seeder.js          → imports all products
 * Run:  node seed/seeder.js --destroy → wipes all products
 */

require("dotenv").config();
const mongoose = require("mongoose");
const connectDB = require("../config/db");
const Product = require("../models/Product");
const products = require("./data");

const importData = async () => {
  try {
    await connectDB();

    await Product.deleteMany(); // clear existing data
    await Product.insertMany(products);

    console.log(`✅ Seed complete: ${products.length} products inserted.`);
    process.exit(0);
  } catch (error) {
    console.error(`❌ Seed failed: ${error.message}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await connectDB();

    await Product.deleteMany();

    console.log("🗑️  All products deleted from database.");
    process.exit(0);
  } catch (error) {
    console.error(`❌ Destroy failed: ${error.message}`);
    process.exit(1);
  }
};

if (process.argv[2] === "--destroy") {
  destroyData();
} else {
  importData();
}
