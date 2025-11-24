import Sale from "../models/sale.js";
import Item from "../models/item.js";
const getSalesByItem = async (req, res, next) => {
  try {
    const report = await Sale.aggregate([
      { $match: {} }, // Include all sales, no filter
      {
        $lookup: {
          from: "items",           // Join with Item collection
          localField: "item",      // FK in Sale
          foreignField: "_id",     // PK in Item
          as: "itemData"           // Output array field
        }
      },
      { $unwind: "$itemData" },   // Flatten the array so each sale has its item data
      {
        $group: {
          _id: "$itemData._id",              // Group by item ID
          sale: { $sum: "$quantity" },       // Total quantity sold per item
          name: { $first: "$itemData.name" } // Keep item name
        }
      },
      { $project: { _id: 0, name: 1, sale: 1 } }, // Output only name and sale
      { $sort: { sale: -1 } } // Sort items by sale descending
    ]);

    return res.status(200).json({
      message: "Sale by Item Report Data has been retrieved successfully",
      error: false,
      success: true,
      report
    });
  } catch (error) {
    next(error);
  }
};
const getSalesByCategory = async (req, res, next) => {
  try {
    const report = await Sale.aggregate([
      { $match: {} }, // Include all sales

      // Join with Item collection
      {
        $lookup: {
          from: "items",
          localField: "item",
          foreignField: "_id",
          as: "itemData"
        }
      },
      { $unwind: "$itemData" },

      // Join Item -> Category
      {
        $lookup: {
          from: "categories",
          localField: "itemData.category",
          foreignField: "_id",
          as: "categoryData"
        }
      },
      { $unwind: "$categoryData" },

      // Group by category and calculate revenue
      {
        $group: {
          _id: "$categoryData.name",
          totalRevenue: { $sum: { $multiply: ["$quantity", "$itemData.price"] } } // revenue = quantity * price
        }
      },

      // Format output
      { $project: { _id: 0, category: "$_id", sales: "$totalRevenue" } },

      { $sort: { sales: -1 } }
    ]);

    return res.status(200).json({
      message: "Sales by Category Report Data has been retrieved successfully",
      success: true,
      report
    });
  } catch (error) {
    next(error);
  }
};
const getSalesOverview = async (req, res, next) => {
  try {
    const salesData = await Sale.aggregate([
      {
        $group: {
          _id: { $month: "$date" }, // Month number 1–12
          sales: { $sum: "$quantity" } // Sum quantity instead of non-existent totalPrice
        }
      },
      { $sort: { "_id": 1 } }
    ]);

    const monthMap = {
      1: "Jan", 2: "Feb", 3: "Mar", 4: "Apr",
      5: "May", 6: "Jun", 7: "Jul", 8: "Aug",
      9: "Sep", 10: "Oct", 11: "Nov", 12: "Dec"
    };

    const report = Array.from({ length: 12 }, (_, i) => ({
      month: monthMap[i + 1],
      sales: 0
    }));

    salesData.forEach(item => {
      if (item._id) report[item._id - 1].sales = item.sales;
    });

    return res.status(200).json({
      message: "Sales overview data retrieved successfully",
      success: true,
      error: false,
      report
    });
  } catch (error) {
    next(error);
  }
};
const getTopItems = async (req, res, next) => {
try {
  const report = await Sale.aggregate([
  { $match: {} }, // Include all sales

  // Join with Item collection
  {
    $lookup: {
      from: "items",           // Collection to join
      localField: "item",      // FK in Sale
      foreignField: "_id",     // PK in Item
      as: "itemData"
    }
  },

  { $unwind: "$itemData" }, // Flatten the array

  // Group by item
  {
    $group: {
      _id: "$itemData._id",         // Group by item ID
      sale: { $sum: "$quantity"},  // Total quantity sold per item
      name: { $first: "$itemData.name"} // Keep item name
    }
  },

  { $sort: { sale: -1 } }, // Sort descending by sales

  { $limit: 50 }, // Take top 50 items

  { $project: { _id: 0, name: 1, sale: 1 } } // Output only name and sale
]);
  return res.status(200).json({
      message: "Top Sale Report Data has been retrieved successfully",
      error: false,
      success: true,
      report
    });
  } catch (error) {
    next(error);
  }
};
const getLowStockItems = async (req, res, next) => {
try {
const lowStockItems = await Item.find({})
  .sort({ stock: 1 }) // Sort by "stock" field in ascending order (lowest first)
  .limit(10);         // Limit to top 50 items

  return res.status(200).json({
      message: "Low Stock Items List has been retrieved successfully",
      error: false,
      success: true,
      lowStockItems
    });
  } catch (error) {
    next(error);
  }
};
const getRevenueAnalytics = async (req, res, next) => {
  try {
    const report = await Sale.aggregate([
      // Join Sale with Item to get price and category
      {
        $lookup: {
          from: "items",
          localField: "item",
          foreignField: "_id",
          as: "itemData",
        },
      },
      { $unwind: "$itemData" }, // Flatten itemData array
      {
        // Compute total price for each sale
        $addFields: {
          totalPrice: { $multiply: ["$quantity", "$itemData.price"] },
        },
      },
      {
        // Group by category ID
        $group: {
          _id: "$itemData.category",
          revenue: { $sum: "$totalPrice" },
        },
      },
      {
        // Join with categories collection to get category names
        $lookup: {
          from: "categories",
          localField: "_id",
          foreignField: "_id",
          as: "categoryData",
        },
      },
      {
        $unwind: {
          path: "$categoryData",
          preserveNullAndEmptyArrays: true, // Keep entries even if category is missing
        },
      },
      {
        $project: {
          _id: 0,
          category: { $ifNull: ["$categoryData.name", "Unknown"] },
          revenue: 1,
        },
      },
      { $sort: { revenue: -1 } }, // Sort descending by revenue
    ]);

    return res.status(200).json({
      message: "Revenue analytics data retrieved successfully",
      success: true,
      error: false,
      report,
    });
  } catch (error) {
    next(error);
  }
};

export {
  getSalesByItem,
  getSalesByCategory,
  getSalesOverview,
  getTopItems,
  getLowStockItems,
  getRevenueAnalytics,
};
