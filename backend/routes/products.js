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
const router = (0, import_express.Router)();
router.get("/", async (req, res) => {
  const { category, search } = req.query;
  const db = await (0, import_database.getDb)();
  let query = "SELECT * FROM products WHERE 1=1";
  const params = [];
  if (category && category !== "all") {
    query += " AND category = ?";
    params.push(category);
  }
  if (search) {
    query += " AND (name LIKE ? OR description LIKE ?)";
    params.push(`%${search}%`, `%${search}%`);
  }
  query += " ORDER BY created_at DESC";
  const result = db.exec(query, params);
  if (result.length === 0) return res.json([]);
  const { columns, values } = result[0];
  const products = values.map((row) => {
    const obj = {};
    columns.forEach((col, i) => {
      obj[col] = row[i];
    });
    return obj;
  });
  return res.json(products);
});
router.get("/:id", async (req, res) => {
  const db = await (0, import_database.getDb)();
  const result = db.exec("SELECT * FROM products WHERE id = ?", [req.params.id]);
  if (result.length === 0 || result[0].values.length === 0) {
    return res.status(404).json({ error: "Product not found" });
  }
  const { columns, values } = result[0];
  const product = {};
  columns.forEach((col, i) => {
    product[col] = values[0][i];
  });
  return res.json(product);
});
var stdin_default = router;
