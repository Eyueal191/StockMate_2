import express from "express";
import {
  getSalesByItem,
  getSalesByCategory,
  getSalesOverview,
  getTopItems,
  getLowStockItems,
  getRevenueAnalytics,
} from "../controllers/report.controllers.js";
import { authenticateUser, authorizeAdmin } from "../middlewares/auth.js";

const reportRoutes = express.Router();

/* ------------------------------
   📌 ROUTES FOR ALL USERS (STAFF)
   ------------------------------ */

// General sales reports (authenticated staff only)
reportRoutes.get("/sales-by-item", authenticateUser, getSalesByItem);
reportRoutes.get("/sales-by-category", authenticateUser, getSalesByCategory);

// Inventory checks (authenticated staff only)
reportRoutes.get("/top-items", authenticateUser, getTopItems);
reportRoutes.get("/low-stock-items", authenticateUser, getLowStockItems);

/* ------------------------------
   🔒 ADMIN-ONLY REPORTS
   ------------------------------ */

// Financial summary & business KPIs
reportRoutes.get("/sales-overview", authenticateUser, authorizeAdmin, getSalesOverview);

// Revenue, profit, and advanced analytics
reportRoutes.get("/revenue-analytics", authenticateUser, authorizeAdmin, getRevenueAnalytics);

export default reportRoutes;
