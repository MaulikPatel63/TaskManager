const { User, Task, Category } = require("../models/index");

const taskAdd = async (req, res) => {
  try {
    const { title, description, dueDate, category } = req.body;

    if (!title || !description || !dueDate) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if user exists
    let user = await User.findById(req.user.id);
    if (!user) {
      return res.status(400).json({ message: "User Dode not exists" });
    }
    if (req.user.role === "user") {
      const taskCount = await Task.countDocuments({ user: req.user.id });
      if (taskCount >= 10) {
        return res
          .status(403)
          .json({ message: "User can only create 10 tasks" });
      }
    }
    let categories = await Category.find({
      name: category,
    });

    // Create Task
    const task = new Task({
      title,
      description,
      dueDate,
      user: user._id,
      category: categories[0]._id,
    });

    await task.save();

    return res.status(201).json({
      message: "Task successfully created!",
      data: task,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", err: error.message });
  }
};

const taskGet = async (req, res) => {
  try {
    let task = await Task.find({ user: req.user.id }).populate(
      "category",
      "name"
    );
    if (!task) {
      return res.status(400).json({ message: "Task Dode not exists" });
    }
    return res.status(200).json({ message: "Task Gets!", data: task });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", err: error.message });
  }
};

const taskGetByID = async (req, res) => {
  try {
    const { id } = req.params;

    let task = await Task.findById(id);
    if (!task) {
      return res.status(400).json({ message: "Task Dode not exists" });
    }
    return res.status(200).json({ message: "Task Gets!", data: task });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", err: error.message });
  }
};

const taskGetByTitle = async (req, res) => {
  try {
    const { title } = req.body;
    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }
    let task = await Task.find({
      title: { $regex: title, $options: "i" },
      user: req.user.id,
    });
    if (!task) {
      return res.status(400).json({ message: "Task Dode not exists" });
    }
    return res.status(200).json({ message: "Task Gets!", data: task });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", err: error.message });
  }
};

const taskGetByStatus = async (req, res) => {
  try {
    // Retrieve query parameters
    const status = req.query.status;
    const dueDate = req.query.dueDate ? new Date(req.query.dueDate) : null;
    const sortBy = req.query.sortBy || "dueDate";
    const sortOrder = req.query.sortOrder === "desc" ? -1 : 1;

    // Build the query object
    const query = {};
    if (status) {
      query.status = status;
    }
    if (dueDate) {
      query.dueDate = dueDate;
    }

    // Fetch tasks with advanced querying
    const tasks = await Task.find(query)
      .sort({ [sortBy]: sortOrder }) // Sort based on query parameter
      .exec();

    // If no tasks found, return a message
    if (tasks.length === 0) {
      return res
        .status(404)
        .json({ message: "No tasks found matching the criteria" });
    }

    return res
      .status(200)
      .json({ message: "Tasks fetched successfully!", data: tasks });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", err: error.message });
  }
};

const taskGetByCategory = async (req, res) => {
  try {
    const { id } = req.params;

    // Use a regular expression to match any part of the name, case-insensitive
    const tasks = await Task.find({ category: id, user: req.user.id }).populate(
      "category",
      "name"
    );

    if (tasks.length === 0) {
      return res.status(404).json({ message: "No matching categories found" });
    }

    return res.status(200).json({
      message: "Tasks retrieved successfully",
      data: tasks,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", err: error.message });
  }
};

const taskUpdate = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, dueDate, status, category } = req.body;

    let task = await Task.findById(id);
    if (!task) {
      return res.status(400).json({ message: "Task Does not exists" });
    }
    if (category) {
      const existingCategory = await Category.findOne({ name: category });
      if (!existingCategory) {
        return res.status(404).json({ message: "Category does not exist." });
      }
      task.category = existingCategory._id; // Set the category ID to the task
    }
    // Create Task
    if (title) {
      task.title = title;
    }
    if (description) {
      task.description = description;
    }
    if (dueDate) {
      task.dueDate = dueDate;
    }
    if (status) {
      task.status = status;
    }

    await task.save();

    return res.status(200).json({
      message: "Task updated successfully",
      data: task,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", err: error.message });
  }
};

const taskDelete = async (req, res) => {
  try {
    const { id } = req.params;

    const task = await Task.findByIdAndDelete(id);

    if (!task) {
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
  taskAdd,
  taskGet,
  taskGetByID,
  taskUpdate,
  taskDelete,
  taskGetByTitle,
  taskGetByCategory,
  taskGetByStatus,
};
