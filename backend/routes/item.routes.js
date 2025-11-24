import express from "express";
import {
  addItem,
  getItems,
  getItemById,
  updateItem,
  deleteItem,
} from "../controllers/item.controllers.js";

import { authenticateUser, authorizeAdmin } from "../middlewares/auth.js";
import { sanitizeItem } from "../middlewares/sanitizers/sanitizeItem.js";
import { validateItem } from "../middlewares/validators/validateItem.js";
import upload from "../config/multer.js";

const itemRoutes = express.Router();

// 1️⃣ Create a new item (Admin only)
itemRoutes.post(
  "/",
  authenticateUser,
  authorizeAdmin,
  upload.single("image"),
  sanitizeItem,
  validateItem,
  addItem
);

// 2️⃣ Get all items (Public)
itemRoutes.get("/", getItems);

// 3️⃣ Get item by ID (Public)
itemRoutes.get("/:id", getItemById);

// 4️⃣ Update an item by ID (Admin only)
itemRoutes.put(
  "/:id",
  authenticateUser,
  authorizeAdmin,
  upload.single("image"),
  updateItem
);

// 5️⃣ Delete an item by ID (Admin only)
itemRoutes.delete(
  "/:id",
  authenticateUser,
  authorizeAdmin,
  deleteItem
);

export default itemRoutes;
