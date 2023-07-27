import ErrorHandler from "../middlewares/error.js";
import { Task } from "../models/task.js";

// This API will create a new task
export const newTask = async (req, res, next) => {
  try {
    const { title, description } = req.body;

    await Task.create({
      title,
      description,
      user: req.user,
    });

    res.status(201).json({
      success: true,
      message: "Task added Successfully",
    });
  } catch (error) {
    next(error);
  }
};

// With the help of this we will get all tasks , using frontend we will list down all tasks using this API
export const getMyTask = async (req, res, next) => {
  try {
    const userid = req.user._id; // Id of the user for which we want to get all tasks

    const tasks = await Task.find({ user: userid }); // we will get all task in an array (find method returns a array)

    res.status(200).json({
      success: true,
      tasks,
    });
  } catch (error) {
    next(error);
  }
};

// API to update task
export const updateTask = async (req, res, next) => {
  try {
    const { id } = req.params; // or const id  = req.params.id
    const task = await Task.findById(id);

    if (!task) return next(new ErrorHandler("Task Not Found", 404));

    task.isCompleted = !task.isCompleted;

    await task.save();

    res.status(200).json({
      success: true,
      message: "Task Updated",
    });
  } catch (error) {
    next(error);
  }
};

//API to delete Task
export const deleteTask = async (req, res, next) => {
  try {
    const { id } = req.params; // or const id  = req.params.id
    const task = await Task.findById(id);

    if (!task) return next(new ErrorHandler("Task Not Found", 404));

    await task.deleteOne();

    res.status(200).json({
      success: true,
      message: "Task Deleted",
    });
  } catch (error) {
    next(error);
  }
};
