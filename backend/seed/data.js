const products = [
  // ── Electronics ────────────────────────────────────────────────────────────
  {
    name: "Wireless Noise-Cancelling Headphones",
    price: 79.99,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500",
    description:
      "Premium over-ear headphones with active noise cancellation, 30-hour battery life, and foldable design. Perfect for travel and daily commutes.",
    stock: 42,
    rating: 4.5,
    reviewCount: 1284,
  },
  {
    name: "Mechanical Gaming Keyboard",
    price: 59.99,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=500",
    description:
      "TKL mechanical keyboard with tactile blue switches, RGB backlight per key, and durable aluminum frame. Ideal for gamers and typists.",
    stock: 30,
    rating: 4.7,
    reviewCount: 892,
  },
  {
    name: "USB-C Hub 7-in-1",
    price: 34.99,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1625895197185-efcec01cffe0?w=500",
    description:
      "Expand your laptop with HDMI 4K output, 3x USB-A, SD card reader, and 100W PD charging — all in a compact aluminum hub.",
    stock: 65,
    rating: 4.3,
    reviewCount: 520,
  },

  // ── Books ───────────────────────────────────────────────────────────────────
  {
    name: "Clean Code by Robert C. Martin",
    price: 29.99,
    category: "Books",
    image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=500",
    description:
      "A handbook of agile software craftsmanship. Learn to write readable, maintainable, and testable code through practical examples and principles.",
    stock: 100,
    rating: 4.8,
    reviewCount: 4300,
  },
  {
    name: "The Pragmatic Programmer",
    price: 27.49,
    category: "Books",
    image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=500",
    description:
      "From journeyman to master — timeless advice for software developers on career, tools, and engineering practices.",
    stock: 80,
    rating: 4.7,
    reviewCount: 3100,
  },
  {
    name: "JavaScript: The Good Parts",
    price: 19.99,
    category: "Books",
    image: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=500",
    description:
      "Douglas Crockford distills JavaScript down to its most reliable and elegant features in this concise, essential read.",
    stock: 55,
    rating: 4.4,
    reviewCount: 2200,
  },

  // ── Clothing ────────────────────────────────────────────────────────────────
  {
    name: "Classic Fit Cotton T-Shirt",
    price: 14.99,
    category: "Clothing",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500",
    description:
      "100% ring-spun cotton everyday tee. Pre-shrunk, double-needle stitched hem, available in 12 colors. A wardrobe essential.",
    stock: 200,
    rating: 4.2,
    reviewCount: 6700,
  },
  {
    name: "Slim-Fit Chino Pants",
    price: 39.99,
    category: "Clothing",
    image: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=500",
    description:
      "Stretch-cotton chinos with a modern slim fit. Wrinkle-resistant fabric transitions seamlessly from office to weekend.",
    stock: 90,
    rating: 4.5,
    reviewCount: 1540,
  },

  // ── Home & Kitchen ──────────────────────────────────────────────────────────
  {
    name: "Stainless Steel French Press",
    price: 24.99,
    category: "Home & Kitchen",
    image: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=500",
    description:
      "34oz double-wall insulated French press that keeps coffee hot for 2 hours. Includes 4-level filtration system for a clean, rich brew.",
    stock: 75,
    rating: 4.6,
    reviewCount: 3890,
  },
  {
    name: "Bamboo Cutting Board Set (3-Piece)",
    price: 22.99,
    category: "Home & Kitchen",
    image: "https://images.unsplash.com/photo-1585637071663-799845ad9f3a?w=500",
    description:
      "Eco-friendly bamboo boards in three sizes with juice grooves and non-slip feet. Naturally antimicrobial and dishwasher safe.",
    stock: 110,
    rating: 4.4,
    reviewCount: 2100,
  },
  {
    name: "Smart LED Desk Lamp",
    price: 45.99,
    category: "Home & Kitchen",
    image: "https://images.unsplash.com/photo-1534353473418-4cfa6c56fd38?w=500",
    description:
      "Touch-dimming LED lamp with 5 color temperatures, USB-A charging port, and 1-hour sleep timer. Eye-care certified flicker-free light.",
    stock: 48,
    rating: 4.6,
    reviewCount: 780,
  },
  {
    name: "Cast Iron Skillet 10-inch",
    price: 32.99,
    category: "Home & Kitchen",
    image: "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=500",
    description:
      "Pre-seasoned cast iron pan that works on all cooktops including induction. Builds natural non-stick surface with each use. Lifetime guarantee.",
    stock: 60,
    rating: 4.9,
    reviewCount: 5600,
  },
];

module.exports = products;
