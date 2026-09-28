import Task from "../models/Task.js";

export async function getTasks(req, res, next) {
  try {
    const { status, priority } = req.query;
    const filter = { user: req.userId };

    if (status && status !== "All") filter.status = status;
    if (priority && priority !== "All") filter.priority = priority;

    const tasks = await Task.find(filter).sort({ createdAt: -1 });
    res.json({ success: true, tasks });
  } catch (error) {
    next(error);
  }
}

export async function createTask(req, res, next) {
  try {
    const { title, description, priority, status, dueDate } = req.body;

    if (!title?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Task title is required"
      });
    }

    const task = await Task.create({
      title: title.trim(),
      description: description?.trim() || "",
      priority: priority || "Medium",
      status: status || "Pending",
      dueDate: dueDate || undefined,
      user: req.userId
    });

    res.status(201).json({ success: true, task });
  } catch (error) {
    next(error);
  }
}

export async function updateTask(req, res, next) {
  try {
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, user: req.userId },
      req.body,
      { new: true, runValidators: true }
    );

    if (!task) {
      return res.status(404).json({ success: false, message: "Task not found" });
    }

    res.json({ success: true, task });
  } catch (error) {
    next(error);
  }
}

export async function deleteTask(req, res, next) {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      user: req.userId
    });

    if (!task) {
      return res.status(404).json({ success: false, message: "Task not found" });
    }

    res.json({ success: true, message: "Task deleted" });
  } catch (error) {
    next(error);
  }
}
