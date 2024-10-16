const { User, Task, Category } = require("../models/index");

// Add a new category
const categoryAdd = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Create category
    const category = new Category({ name });

    await category.save();

    res.status(201).json({
      message: "Category successfully created!",
      data: category,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", err: error.message });
  }
};

// Get all categories
const categoryGet = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json({
      message: "Categories retrieved successfully",
      data: categories,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", err: error.message });
  }
};

// Get a single category by ID
const categoryGetByID = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findById(id);

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.status(200).json({
      message: "Category retrieved successfully",
      data: category,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", err: error.message });
  }
};

// Get a single category by Name
const categoryGetByName = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ message: "Name is required" });
    }

    // Use a regular expression to match any part of the name, case-insensitive
    const categories = await Category.find({
      name: { $regex: name, $options: "i" },
    });

    if (categories.length === 0) {
      return res.status(404).json({ message: "No matching categories found" });
    }

    res.status(200).json({
      message: "Category retrieved successfully",
      data: categories,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", err: error.message });
  }
};

// Update a category by ID
const categoryUpdate = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Name is required" });
    }

    // Find the category by ID and update its name
    const category = await Category.findByIdAndUpdate(
      id,
      { name },
      { new: true }
    );

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.status(200).json({
      message: "Category updated successfully",
      category: category,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", err: error.message });
  }
};

// Delete a category by ID
const categoryDelete = async (req, res) => {
  try {
    const { id } = req.params;

    const category = await Category.findByIdAndDelete(id);

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.status(200).json({
      message: "Category deleted successfully",
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", err: error.message });
  }
};

module.exports = {
  categoryAdd,
  categoryGet,
  categoryGetByID,
  categoryUpdate,
  categoryGetByName,
  categoryDelete,
};
