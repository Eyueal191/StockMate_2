import Sale from "../models/sale.js"
import Item from "../models/item.js"
import Category from "../models/category.js"
// 1. addSale.
const addSale = async (req, res, next) => {
  try {
    const data = req.body;
    let item = await Item.findOne({ name: { $regex: data.name, $options: "i" } });
    if (!item) {
      return res.status(404).json({
        message: "Please provide the correct product name",
        error: true,
        success: false
      });
    }

    // Deduct from stock
    if (item.stock < data.quantity) {
      return res.status(400).json({
        message: "Insufficient stock",
        error: true,
        success: false
      });
    }
    item.stock -= Number(data.quantity);
    await item.save();
    // Create sale
    let soldItem = await Sale.create({
      ...data,
      item: item._id,      // store the item reference
    });

    return res.status(201).json({
      message: "This sale has been recorded successfully",
      error: false,
      success: true,
      soldItem
    });
  } catch (error) {
    next(error);
  }
};
// 2 getSales.
const getSales = async (req, res, next) => {
  try {
    const { search, upperDate, lowerDate } = req.query;

    let query = {};

    // Search filter
    if (search && search.trim() !== "") {
      const item = await Item.findOne({ name: { $regex: search, $options: "i" } });
      if (item) query.item = item._id;
      else query.seller = { $regex: search, $options: "i" };
    }

    // Date filter
    if (lowerDate || upperDate) {
      query.date = {};
      if (lowerDate) {query.date.$gte = new Date(lowerDate);}
      if (upperDate) {query.date.$lte = new Date(upperDate);}

      // If both dates are the same, match that exact day
      if (lowerDate && upperDate && lowerDate === upperDate) {
        query.date = new Date(lowerDate);
      }
    }

    const sales = await Sale.find(query).populate("item", "name price image description");

    return res.status(200).json({
      message: "Sales fetched successfully",
      error: false,
      success: true,
      sales
    });
  } catch (error) {
    next(error);
  }
};

// 3. Get Sale by ID
const getSaleById = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    // Find sale by ID and populate the 'item' field
    const sale = await Sale.findOne({ _id: id }).populate("item", "name price image");

    if (!sale) {
      return res.status(404).json({
        message: "Sale record not found",
        success: false,
        error: true,
      });
    }

    res.status(200).json({
      message: "Sale record retrieved successfully",
      success: true,
      error: false,
      sale, // <-- frontend will use sale.item
    });
  } catch (error) {
    next(error);
  }
};


const updateSale = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updateData = req.body; // e.g., { quantity, item, seller }

    // Fetch previous sale and its item info
    const previousSale = await Sale.findById(id).populate("item", "name stock");
    if (!previousSale) {
      return res.status(404).json({
        message: "Sale record not found",
        success: false,
        error: true,
      });
    }

    const item = await Item.findById(previousSale.item._id);
    if (!item) {
      return res.status(404).json({
        message: "Associated item not found",
        success: false,
        error: true,
      });
    }

    // Calculate stock change
    const newQuantity = Number(updateData.quantity);
    const stockDiff = newQuantity - previousSale.quantity; // how much stock is needed extra
    if (stockDiff > item.stock) {
      return res.status(400).json({
        message: "Insufficient stock: cannot update sale",
        success: false,
        error: true,
      });
    }

    // Update item stock
    item.stock -= stockDiff;
    await item.save();

    // Update sale record
    const updatedSale = await Sale.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    }).populate("item", "name price");

    return res.status(200).json({
      message: "Sale record updated successfully",
      success: true,
      error: false,
      data: updatedSale,
    });
  } catch (error) {
    next(error);
  }
};
// 5. deleteSale
const deleteSale = async (req, res, next) => {
  try {
    const { id } = req.params; // get the sale ID from the URL
    const deletedSale = await Sale.findByIdAndDelete(id);

    if (!deletedSale) {
      return res.status(404).json({
        message: "Sale record not found",
        error: true,
        success: false
      });
    }

    return res.status(200).json({
      message: "Sale record deleted successfully",
      success: true,
      error: false,
      data: deletedSale
    });
  } catch (error) {
    next(error);
  }
};

export { addSale, getSales, getSaleById, updateSale, deleteSale };
