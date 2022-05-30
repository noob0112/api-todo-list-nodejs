const Task = require("../models/Task.js");
const taskRepository = require("../repository/taskRep.js");
const userRepository = require("../repository/userRep.js");

const taskInterface = "_id title status userId createdAt updatedAt";

const taskService = {
  createTask: async (req) => {
    const newTask = new Task({
      userId: req.user.id,
      title: req.body.title,
    });

    const task = await taskRepository.createTask(newTask);
    await userRepository.findByIdAndAddTask(req.user.id, task.data.data._id);
    return task;
  },

  findAllTaskByUserId: (req) => {
    return taskRepository.findAllTaskByUserId(req.user.id, taskInterface);
  },

  findTaskByStatus: async (req) => {
    const data = await taskRepository.findTaskByStatus(
      req.user.id,
      req.query.status.toUpperCase(),
      taskInterface
    );
    return data;
  },

  findTaskById: async (req) => {
    const task = await taskRepository.findTaskById(
      req.params.id,
      taskInterface
    );
    if (task.data.data.userId.toString() !== req.user.id) {
      return {
        statusCode: 401,
        data: {
          message: "You are not alowed to do that!",
        },
      };
    }
    return task;
  },

  updateTaskById: async (req) => {
    const data = await taskRepository.updateTaskById(
      req.params.id,
      req.body,
      req.user.id
    );
    return data;
  },

  deleteTask: async (req) => {
    await userRepository.findUserByIdAndRemmoveTask(req.user.id, req.params.id);
    const data = await taskRepository.deleteTaskById(req.params.id);
    return data;
  },
};

module.exports = taskService;
