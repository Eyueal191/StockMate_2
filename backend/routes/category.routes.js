import express from "express";
import {
  addCategory,
  getCategories,
  getCategoryById,
  updateCategory,
  deleteCategory
} from "../controllers/category.controllers.js";
import {authenticateUser, authorizeAdmin} from "../middlewares/auth.js";
import {sanitizeCategory} from "../middlewares/sanitizers/sanitizeCategory.js"
import {validateCategory} from "../middlewares/validators/validateCategory.js"
const categoryRoutes = express.Router();

// Create a category
categoryRoutes.post("/categories",authenticateUser,sanitizeCategory,validateCategory,authorizeAdmin, addCategory);

// Get all categories
categoryRoutes.get("/categories",authenticateUser, getCategories);

// Get category by ID
categoryRoutes.get("/categories/:id",authenticateUser, getCategoryById);

// Update category
categoryRoutes.put("/categories/:id",authenticateUser, updateCategory);

// Delete category
categoryRoutes.delete("/categories/:id",authenticateUser,authorizeAdmin, deleteCategory);

export default categoryRoutes;
