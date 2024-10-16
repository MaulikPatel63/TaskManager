const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    status: {
      type: String,
      enum: ["pending", "completed", "overdue"],
      default: "pending",
    },
    dueDate: {
      type: Date,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
  },
  { timestamps: true }
);

// Middleware to update status based on dueDate
taskSchema.pre("save", function (next) {
  if (this.dueDate < new Date() && this.status !== "completed") {
    this.status = "overdue";
  }
  next();
});

const Task = mongoose.model("Task", taskSchema);
module.exports = Task ;
