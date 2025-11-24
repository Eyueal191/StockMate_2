import Category from "../models/category.js";
// 1. Add Category
const addCategory = async (req, res, next) => {
  try {
    const { name } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({
        message: "Category name cannot be empty",
        success: false,
        error: true,
      });
    }

    // Normalize incoming name: trim, collapse spaces, lowercase
    const normalizedName = name.trim().replace(/\s+/g, "").toLowerCase();

    // Check if category exists ignoring spaces and case
    const existingCategory = await Category.findOne({
      $expr: {
        $eq: [
          {
            $toLower: {
              $replaceAll: { input: { $trim: { input: "$name" } }, find: " ", replacement: "" }
            }
          },
          normalizedName,
        ],
      },
    });

    if (existingCategory) {
      return res.status(400).json({
        message: "The category already exists",
        success: false,
        error: true,
      });
    }

    const category = await Category.create({ name });

    res.status(201).json({
      message: "Category created successfully",
      success: true,
      error: false,
      category,
    });
  } catch (error) {
    next(error);
  }
};

// 2. Get All Categories
const getCategories = async (req, res, next) => {
    try {
        const categories = await Category.find().sort({ createdAt: -1 });
        res.status(200).json({
            message: "Fetched all categories",
            success: true,
            error: false,
            categories
        });
    } catch (error) {
        next(error);
    }
};

// 3. Get Category by ID
const getCategoryById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const category = await Category.findById(id);
        if (!category) return res.status(404).json({ message: "Category not found", success: false, error: true });
        res.status(200).json({
            message: "Category fetched successfully",
            success: true,
            error: false,
            category
        });
    } catch (error) {
        next(error);
    }
};

// 4. Update Category by ID
const updateCategory = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { name } = req.body;
        const updated = await Category.findByIdAndUpdate(id, { name }, { new: true, runValidators: true });
        if (!updated) return res.status(404).json({ message: "Category not found", success: false, error: true });
        res.status(200).json({
            message: "Category updated successfully",
            success: true,
            error: false,
            updated
        });
    } catch (error) {
        next(error);
    }
};

// 5. Delete Category by ID
const deleteCategory = async (req, res, next) => {
    try {
        const { id } = req.params;
        const deleted = await Category.findByIdAndDelete(id);
        if (!deleted) return res.status(404).json({ message: "Category not found", success: false, error: true });
        res.status(200).json({
            message: "Category deleted successfully",
            success: true,
            error: false,
            deleted
        });
    } catch (error) {
        next(error);
    }
};

export { addCategory, getCategories, getCategoryById, updateCategory, deleteCategory };
