var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var stdin_exports = {};
__export(stdin_exports, {
  default: () => stdin_default
});
module.exports = __toCommonJS(stdin_exports);
var import_express = require("express");
var import_bcryptjs = __toESM(require("bcryptjs"));
var import_jsonwebtoken = __toESM(require("jsonwebtoken"));
var import_database = require("../database");
const router = (0, import_express.Router)();
const JWT_SECRET = process.env.JWT_SECRET || "mrstore-secret-key-change-in-production";
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ error: "Name, email, and password are required" });
  }
  const db = await (0, import_database.getDb)();
  const existing = db.exec("SELECT id FROM users WHERE email = ?", [email]);
  if (existing.length > 0 && existing[0].values.length > 0) {
    return res.status(409).json({ error: "Email already registered" });
  }
  const hashedPassword = import_bcryptjs.default.hashSync(password, 10);
  db.run("INSERT INTO users (name, email, password) VALUES (?, ?, ?)", [name, email, hashedPassword]);
  (0, import_database.saveDb)();
  const idResult = db.exec("SELECT last_insert_rowid()");
  const userId = idResult[0].values[0][0];
  const token = import_jsonwebtoken.default.sign({ userId }, JWT_SECRET, { expiresIn: "7d" });
  return res.status(201).json({ token, user: { id: userId, name, email } });
});
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }
  const db = await (0, import_database.getDb)();
  const result = db.exec("SELECT id, name, email, password FROM users WHERE email = ?", [email]);
  if (result.length === 0 || result[0].values.length === 0) {
    return res.status(401).json({ error: "Invalid email or password" });
  }
  const [id, name, userEmail, hashedPassword] = result[0].values[0];
  if (!import_bcryptjs.default.compareSync(password, hashedPassword)) {
    return res.status(401).json({ error: "Invalid email or password" });
  }
  const token = import_jsonwebtoken.default.sign({ userId: id }, JWT_SECRET, { expiresIn: "7d" });
  return res.json({ token, user: { id, name, email: userEmail } });
});
var stdin_default = router;
