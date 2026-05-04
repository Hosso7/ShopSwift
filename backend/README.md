# E-Commerce Backend API

Node.js + Express + MongoDB backend for the mini e-commerce project.

---

## Folder Structure

```
backend/
├── config/
│   └── db.js                  # MongoDB connection
├── controllers/
│   └── productController.js   # Business logic for all endpoints
├── models/
│   └── Product.js             # Mongoose schema & model
├── routes/
│   └── productRoutes.js       # Route definitions
├── seed/
│   ├── data.js                # 12 sample products (4 categories)
│   └── seeder.js              # Import / destroy seed data
├── .env.example               # Environment variable template
├── .gitignore
├── package.json
└── server.js                  # App entry point
```

---

## Setup

### 1. Install dependencies
```bash
npm install
```

### 2. Configure environment
```bash
cp .env.example .env
```
Edit `.env` and set your MongoDB URI:
```
PORT=5000
MONGO_URI=mongodb://localhost:27017/ecommerce
NODE_ENV=development
```

### 3. Seed the database
```bash
npm run seed
```
To wipe the database:
```bash
node seed/seeder.js --destroy
```

### 4. Start the server
```bash
# Development (auto-reload)
npm run dev

# Production
npm start
```

---

## API Endpoints

| Method | Endpoint                    | Description                          |
|--------|-----------------------------|--------------------------------------|
| GET    | `/api/health`               | Health check                         |
| GET    | `/api/products`             | Get all products                     |
| GET    | `/api/products?category=X`  | Filter products by category          |
| GET    | `/api/products/categories`  | Get list of all unique categories    |
| GET    | `/api/products/:id`         | Get single product by ID             |
| POST   | `/api/products`             | Create a new product                 |
| DELETE | `/api/products/:id`         | Delete a product by ID               |

---

## Response Format

All responses follow a consistent envelope:

```json
{
  "success": true,
  "count": 12,
  "data": [ ...products ]
}
```

Errors:
```json
{
  "success": false,
  "message": "Product not found"
}
```

---

## Sample Product Payload (POST)

```json
{
  "name": "Wireless Mouse",
  "price": 24.99,
  "category": "Electronics",
  "image": "https://example.com/mouse.jpg",
  "description": "Ergonomic wireless mouse with long battery life.",
  "stock": 50,
  "rating": 4.5,
  "reviewCount": 300
}
```
