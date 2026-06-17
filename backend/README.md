# MrStore Backend

Express.js REST API with SQLite database (no C++ build tools required).

## Why sql.js instead of better-sqlite3?

`better-sqlite3` requires Visual Studio C++ build tools to compile on Windows.
This backend uses `sql.js` (pure JavaScript SQLite) — no compilation needed,
works on Windows out of the box.

## Folder Structure

```
backend/
├── server.ts               ← Express app entry point (port 5000)
├── database.ts             ← SQLite setup via sql.js
├── seed.ts                 ← Populate products into the database
├── mrstore.db              ← Database file (auto-created on first run)
├── package.json
├── tsconfig.json
├── middleware/
│   └── authMiddleware.ts   ← JWT authentication
└── routes/
    ├── auth.ts             ← Register & Login
    ├── products.ts         ← Product listing & detail
    └── orders.ts           ← Order placement & history (login required)
```

## Setup & Run (Windows)

Open a terminal in the `backend` folder:

```bash
npm install
npm run seed    # loads 8 products into mrstore.db
npm run dev     # starts server at http://localhost:5000
```

## API Endpoints

| Method | Endpoint              | Auth | Description           |
|--------|-----------------------|------|-----------------------|
| POST   | /api/auth/register    | No   | Create account        |
| POST   | /api/auth/login       | No   | Login, get JWT token  |
| GET    | /api/products         | No   | List all products     |
| GET    | /api/products/:id     | No   | Single product        |
| POST   | /api/orders           | Yes  | Place an order        |
| GET    | /api/orders           | Yes  | Your order history    |
| GET    | /api/orders/:id       | Yes  | Single order detail   |
| GET    | /api/health           | No   | Health check          |
