var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var stdin_exports = {};
__export(stdin_exports, {
  default: () => stdin_default
});
module.exports = __toCommonJS(stdin_exports);
var import_express = require("express");
var import_database = require("../database");
var import_authMiddleware = require("../middleware/authMiddleware");
const router = (0, import_express.Router)();
router.use(import_authMiddleware.authMiddleware);
router.post("/", async (req, res) => {
  const { items, total, shippingInfo } = req.body;
  if (!items || !items.length || !total || !shippingInfo) {
    return res.status(400).json({ error: "Items, total, and shipping info are required" });
  }
  if (typeof req.userId !== "number") {
    return res.status(401).json({ error: "Unauthorized" });
  }
  const userId = req.userId;
  const db = await (0, import_database.getDb)();
  db.run(
    `INSERT INTO orders (user_id, total, shipping_address, shipping_city, shipping_state, shipping_zip, shipping_phone)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [userId, total, shippingInfo.address, shippingInfo.city, shippingInfo.state, shippingInfo.zipCode, shippingInfo.phone]
  );
  const orderIdResult = db.exec("SELECT last_insert_rowid()");
  const orderId = Number(orderIdResult[0].values[0][0]);
  for (const item of items) {
    if (!item?.id || !item?.name || !item?.price || !item?.quantity) {
      return res.status(400).json({ error: "Invalid item data" });
    }
    db.run(
      "INSERT INTO order_items (order_id, product_id, product_name, price, quantity) VALUES (?, ?, ?, ?, ?)",
      [orderId, item.id, item.name, item.price, item.quantity]
    );
    db.run("UPDATE products SET stock = stock - ? WHERE id = ?", [item.quantity, item.id]);
  }
  (0, import_database.saveDb)();
  return res.status(201).json({ orderId, message: "Order placed successfully" });
});
router.get("/", async (req, res) => {
  if (typeof req.userId !== "number") {
    return res.status(401).json({ error: "Unauthorized" });
  }
  const userId = req.userId;
  const db = await (0, import_database.getDb)();
  const result = db.exec(
    "SELECT * FROM orders WHERE user_id = ? ORDER BY created_at DESC",
    [userId]
  );
  if (result.length === 0) return res.json([]);
  const { columns, values } = result[0];
  const orders = values.map((row) => {
    const obj = {};
    columns.forEach((col, i) => {
      obj[col] = row[i];
    });
    return obj;
  });
  return res.json(orders);
});
router.get("/:id", async (req, res) => {
  if (typeof req.userId !== "number") {
    return res.status(401).json({ error: "Unauthorized" });
  }
  const userId = req.userId;
  const orderId = Number(req.params.id);
  if (Number.isNaN(orderId)) {
    return res.status(400).json({ error: "Invalid order ID" });
  }
  const db = await (0, import_database.getDb)();
  const orderResult = db.exec(
    "SELECT * FROM orders WHERE id = ? AND user_id = ?",
    [orderId, userId]
  );
  if (orderResult.length === 0 || orderResult[0].values.length === 0) {
    return res.status(404).json({ error: "Order not found" });
  }
  const { columns, values } = orderResult[0];
  const order = {};
  columns.forEach((col, i) => {
    order[col] = values[0][i];
  });
  const itemsResult = db.exec("SELECT * FROM order_items WHERE order_id = ?", [orderId]);
  const items = itemsResult.length > 0 ? itemsResult[0].values.map((row) => {
    const obj = {};
    itemsResult[0].columns.forEach((col, i) => {
      obj[col] = row[i];
    });
    return obj;
  }) : [];
  return res.json({ ...order, items });
});
var stdin_default = router;
