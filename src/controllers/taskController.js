const taskService = require("../services/taskService");

const taskController = {
  createTask: async (req, res) => {
    try {
      const data = await taskService.createTask(req);      
      return res.status(data.statusCode).json(data.data);
    } catch (error) {
      return res.status(error.statusCode).json(error.data);
    }
  },

  readAll: async (req, res) => {
    try {
      const data = await taskService.findAllTaskByUserId(req);
      return res.status(data.statusCode).json(data.data);
    } catch (error) {
      return res.status(error.statusCode).json(error.data);
    }
  },

  readOne: async (req, res) => {
    try {
      const data = await taskService.findTaskById(req);
      return res.status(data.statusCode).json(data.data);
    } catch (error) {
      res.status(error.statusCode).json(error.data);
    }
  },

  getTaskByStatus: async (req, res) => {
    try{
      const data = await taskService.findTaskByStatus(req);
      return res.status(data.statusCode).json(data.data);
    } catch (error) {
      res.status(error.statusCode).json(error.data);
    }
  },

  update: async (req, res) => {
    try {
      const data = await taskService.updateTaskById(req);
      return res.status(data.statusCode).json(data.data);
    } catch (error) {
      console.log(error);
      res.status(error.statusCode).json(error.data);
    }
  },

  deleteOne: async (req, res) => {
    try {
      const data = await taskService.deleteTask(req);
      return res.status(data.statusCode).json(data.data);
    } catch (error) {
      res.status(error.statusCode).json(error.data);
    }
  },
};
module.exports = taskController;
