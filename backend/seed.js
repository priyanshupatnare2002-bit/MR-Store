var import_database = require("./database");
const products = [
  {
    id: "1",
    name: "Wireless Bluetooth Headphones",
    description: "Premium noise-cancelling headphones with 30-hour battery life.",
    price: 7999,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500",
    stock: 50,
    rating: 4.5,
    reviews: 128
  },
  {
    id: "2",
    name: "Smart Watch Pro",
    description: "Feature-packed smartwatch with health monitoring, GPS, and 7-day battery.",
    price: 14999,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500",
    stock: 30,
    rating: 4.3,
    reviews: 95
  },
  {
    id: "3",
    name: "Running Shoes",
    description: "Lightweight and comfortable running shoes with advanced cushioning.",
    price: 4999,
    category: "Sports",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500",
    stock: 75,
    rating: 4.7,
    reviews: 210
  },
  {
    id: "4",
    name: "Mechanical Keyboard",
    description: "RGB mechanical keyboard with tactile switches and customizable backlighting.",
    price: 6499,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500",
    stock: 40,
    rating: 4.6,
    reviews: 87
  },
  {
    id: "5",
    name: "Coffee Maker Deluxe",
    description: "Programmable coffee maker with built-in grinder and thermal carafe.",
    price: 8999,
    category: "Kitchen",
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=500",
    stock: 25,
    rating: 4.4,
    reviews: 63
  },
  {
    id: "6",
    name: "Yoga Mat Premium",
    description: "Non-slip eco-friendly yoga mat with alignment lines and carry strap.",
    price: 1999,
    category: "Sports",
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=500",
    stock: 100,
    rating: 4.8,
    reviews: 156
  },
  {
    id: "7",
    name: "Laptop Backpack",
    description: 'Water-resistant backpack with USB charging port and 17" laptop compartment.',
    price: 3499,
    category: "Accessories",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500",
    stock: 60,
    rating: 4.2,
    reviews: 74
  },
  {
    id: "8",
    name: "Wireless Gaming Mouse",
    description: "High-precision gaming mouse with 25K DPI sensor and 70-hour battery.",
    price: 5499,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1527814050087-3793815479db?w=500",
    stock: 8,
    rating: 4.5,
    reviews: 112
  }
];
(async () => {
  const db = await (0, import_database.getDb)();
  for (const p of products) {
    db.run(
      `INSERT OR REPLACE INTO products (id, name, description, price, category, image, stock, rating, reviews)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [p.id, p.name, p.description, p.price, p.category, p.image, p.stock, p.rating, p.reviews]
    );
  }
  (0, import_database.saveDb)();
  console.log(`Seeded ${products.length} products into mrstore.db`);
})();
