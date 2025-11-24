import dotenv from "dotenv";
import mongoose from "mongoose";
import connectDB from "./config/db.js";
import Sale from "./models/Sale.js";
import Item from "./models/Item.js";

dotenv.config();

const seedSales = async () => {
  try {
    await connectDB();

    const products = [
      "Real Techniques Makeup Brush Set",
      "Beauty Blender Original",
      "Shiseido Eyelash Curler",
      "Conair Makeup Mirror",
      "Tweezerman Tweezers"
    ];

    const items = await Item.find({ name: { $in: products } });

    if (!items || items.length === 0) {
      console.log("No items found in DB. Please insert products first.");
      process.exit();
    }

    // Helper function to get a random date in a given month of 2025
    const getRandomDateInMonth = (month) => {
      const day = Math.floor(Math.random() * 28) + 1; // avoids invalid days
      return new Date(2025, month, day);
    };

    const salesData = [];

    // Dynamically generate months 0–11
    const months = Array.from({ length: 12 }, (_, i) => i);

    products.forEach((productName) => {
      const item = items.find(p => p.name === productName);
      if (!item) return;

      months.forEach((month) => {
        // Exactly 2 sales per month
        for (let i = 0; i < 2; i++) {
          salesData.push({
            item: item._id,
            quantity: Math.floor(Math.random() * 10) + 1, // random 1–10
            seller: "Eyueal",
            date: getRandomDateInMonth(month),
          });
        }
      });
    });

    await Sale.insertMany(salesData);

    console.log("Tools & Accessories sales seeded successfully for all 12 months!");
    process.exit();
  } catch (error) {
    console.error("Error seeding sales:", error);
    process.exit(1);
  }
};

seedSales();
