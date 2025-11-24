import express from "express";
import userRoutes from "./user.routes.js";
import categoryRoutes from "./category.routes.js";
import itemRoutes from "./item.routes.js";
import saleRoutes from "./sale.routes.js";
import reportRoutes from "./report.routes.js";
const rootRoute = express.Router();

// User routes => /api/user/*
rootRoute.use("/user", userRoutes);

// Category routes => /api/category/*
rootRoute.use("/category", categoryRoutes);
// Item routes => /api/item/
rootRoute.use("/item", itemRoutes)
// Sale Routes => /api/sale/
rootRoute.use("/sale", saleRoutes)

// Report routes => /api/report/*
rootRoute.use("/report", reportRoutes);
export default rootRoute;
