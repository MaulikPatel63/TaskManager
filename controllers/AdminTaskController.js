const { User, Task, Category } = require("../models/index");

const admintaskAdd = async (req, res) => {
  try {
    const { title, description, dueDate, category, userid } = req.body;

    if (!title || !description || !dueDate) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if user exists
    let user = await User.findById(userid);
    if (!user) {
      return res.status(400).json({ message: "User Dode not exists" });
    }
    if (req.user.role === "user") {
      const admintaskCount = await Task.countDocuments({ user: req.user.id });
      if (admintaskCount >= 10) {
        return res
          .status(403)
          .json({ message: "User can only create 10 admintasks" });
      }
    }
    let categories = await Category.find({
      name: category,
    });

    // Create Task
    const admintask = new Task({
      title,
      description,
      dueDate,
      user: user._id,
      category: categories[0]._id,
    });

    await admintask.save();

    return res.status(201).json({
      message: "Task successfully created!",
      data: admintask,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", err: error.message });
  }
};

const admintaskGet = async (req, res) => {
  try {
    // Get page and limit from query parameters
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    // Fetch tasks with pagination
    const admintask = await Task.find().skip(skip).limit(limit);

    const totalTasks = await Task.countDocuments();

    // Prepare the response
    const response = {
      message: "Tasks fetched successfully!",
      pagination: {
        totalTasks,
        totalPages: Math.ceil(totalTasks / limit),
        currentPage: page,
        limit,
      },
      data: admintask,
    };

    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      err: error.message,
    });
  }
};

const admintaskGetByID = async (req, res) => {
  try {
    const { id } = req.params;

    let admintask = await Task.findById(id);
    if (!admintask) {
      return res.status(400).json({ message: "Task Dode not exists" });
    }
    return res.status(200).json({ message: "Task Gets!", data: admintask });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", err: error.message });
  }
};

const admintaskGetByTitle = async (req, res) => {
  try {
    const { title } = req.body;
    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }
    let admintask = await Task.find({
      title: { $regex: title, $options: "i" },
    });
    if (!admintask) {
      return res.status(400).json({ message: "Task Dode not exists" });
    }
    return res.status(200).json({ message: "Task Gets!", data: admintask });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", err: error.message });
  }
};

const admintaskGetByCategory = async (req, res) => {
  try {
    const { id } = req.params;

    // Use a regular expression to match any part of the name, case-insensitive
    const admintasks = await Task.find({ category: id }).populate(
      "category",
      "name"
    );

    if (admintasks.length === 0) {
      return res.status(404).json({ message: "No matching categories found" });
    }

    return res.status(200).json({
      message: "Tasks retrieved successfully",
      data: admintasks,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", err: error.message });
  }
};

const admintaskUpdate = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, dueDate } = req.body;

    let admintask = await Task.findById(id);
    if (!admintask) {
      return res.status(400).json({ message: "Task Does not exists" });
    }

    if (!title || !description || !dueDate) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Create Task
    admintask.title = title;
    admintask.description = description;
    admintask.dueDate = dueDate;

    await admintask.save();

    return res.status(200).json({
      message: "Task updated successfully",
      data: admintask,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", err: error.message });
  }
};

const admintaskDelete = async (req, res) => {
  try {
    const { id } = req.params;

    const admintask = await Task.findByIdAndDelete(id);

    if (!admintask) {
      return res.status(404).json({ message: "Task does not exist" });
    }

    return res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", err: error.message });
  }
};

module.exports = {
  admintaskAdd,
  admintaskGet,
  admintaskGetByID,
  admintaskUpdate,
  admintaskDelete,
  admintaskGetByTitle,
  admintaskGetByCategory,
};
