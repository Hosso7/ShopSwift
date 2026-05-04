const Product = require("../models/Product");

// ─── GET /api/products ────────────────────────────────────────────────────────
// Returns all products. Supports optional ?category= query filter.
const getAllProducts = async (req, res) => {
  try {
    const filter = {};

    if (req.query.category) {
      // case-insensitive category match
      filter.category = { $regex: new RegExp(`^${req.query.category}$`, "i") };
    }

    const products = await Product.find(filter).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: products.length,
      data: products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error while fetching products",
      error: error.message,
    });
  }
};

// ─── GET /api/products/categories ────────────────────────────────────────────
// Returns a list of all unique category names.
const getCategories = async (req, res) => {
  try {
    const categories = await Product.distinct("category");

    res.status(200).json({
      success: true,
      data: categories.sort(),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error while fetching categories",
      error: error.message,
    });
  }
};

// ─── GET /api/products/:id ────────────────────────────────────────────────────
// Returns a single product by its MongoDB _id.
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      data: product,
    });
  } catch (error) {
    // Catches malformed ObjectId errors
    if (error.kind === "ObjectId") {
      return res.status(400).json({
        success: false,
        message: "Invalid product ID format",
      });
    }

    res.status(500).json({
      success: false,
      message: "Server error while fetching product",
      error: error.message,
    });
  }
};

// ─── POST /api/products ───────────────────────────────────────────────────────
// Creates and saves a new product. Used for testing / admin seeding.
const createProduct = async (req, res) => {
  try {
    const { name, price, category, image, description, stock, rating, reviewCount } =
      req.body;

    const product = await Product.create({
      name,
      price,
      category,
      image,
      description,
      stock,
      rating,
      reviewCount,
    });

    res.status(201).json({
      success: true,
      message: "Product created successfully",
      data: product,
    });
  } catch (error) {
    // Mongoose validation errors
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((e) => e.message);
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: messages,
      });
    }

    res.status(500).json({
      success: false,
      message: "Server error while creating product",
      error: error.message,
    });
  }
};

// ─── DELETE /api/products/:id ─────────────────────────────────────────────────
// Deletes a product by its MongoDB _id.
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
      data: { id: req.params.id },
    });
  } catch (error) {
    if (error.kind === "ObjectId") {
      return res.status(400).json({
        success: false,
        message: "Invalid product ID format",
      });
    }

    res.status(500).json({
      success: false,
      message: "Server error while deleting product",
      error: error.message,
    });
  }
};

module.exports = {
  getAllProducts,
  getCategories,
  getProductById,
  createProduct,
  deleteProduct,
};
