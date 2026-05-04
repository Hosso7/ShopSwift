const express = require("express");
const router = express.Router();

const {
  getAllProducts,
  getCategories,
  getProductById,
  createProduct,
  deleteProduct,
} = require("../controllers/productController");

// IMPORTANT: /categories must be defined BEFORE /:id
// to prevent Express from matching "categories" as an :id param
router.get("/categories", getCategories);

router.route("/").get(getAllProducts).post(createProduct);

router.route("/:id").get(getProductById).delete(deleteProduct);

module.exports = router;
