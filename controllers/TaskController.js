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
    let task = await Task.find({ user: req.user.id });
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
    let task = await Task.find({ title: { $regex: title, $options: "i" } });
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

const taskGetByCategory = async (req, res) => {
  try {
    const { id } = req.params;

    // Use a regular expression to match any part of the name, case-insensitive
    const tasks = await Task.find({ category: id }).populate(
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
    const { title, description, dueDate } = req.body;

    let task = await Task.findById(id);
    if (!task) {
      return res.status(400).json({ message: "Task Does not exists" });
    }

    if (!title || !description || !dueDate) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Create Task
    task.title = title;
    task.description = description;
    task.dueDate = dueDate;

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
};
