const Task = require("../models/Task");

const taskRepository = {
  createTask: (task) => {
    return new Promise(function (resolve, reject) {
      task
        .save()
        .then((task) => {
          resolve({ statusCode: 201, data: { data: task } });
        })
        .catch((error) => {
          reject({
            statusCode: 400,
            data: { message: error.message },
          });
        });
    });
  },

  findAllTaskByUserId: (userId, interface) => {
    return new Promise(function (resolve, reject) {
      Task.find({ userId: userId }, interface)
        .then((tasks) => {
          resolve({ statusCode: 200, data: { data: tasks } });
        })
        .catch((error) => {
          reject({ statusCode: 500, data: { error } });
        });
    });
  },

  findTaskByStatus: (userId, status, interface) => {
    return new Promise(function (resolve, reject) {
      Task.find({ userId: userId, status: status }, interface)
        .then((tasks) => {
          console.log(tasks);
          resolve({ statusCode: 200, data: { data: tasks } });
        })
        .catch((error) => {
          reject({ statusCode: 500, data: { error } });
        });
    });
  },

  findTaskById: (taskId, interface) => {
    return new Promise(function (resolve, reject) {
      Task.findById(taskId, interface)
        .then((task) => {
          if (task) {
            reject({
              statusCode: 404,
              data: { message: "Task does not exist" },
            });
          }
          resolve({ statusCode: 200, data: { data: task } });
        })
        .catch((error) => {
          reject({ statusCode: 404, data: { message: error } });
        });
    });
  },

  updateTaskById: (taskId, taskUpdate, userId) => {
    return new Promise(function (resolve, reject) {
      Task.findById(taskId)
        .then((task) => {
          if (task.userId == userId) {
            reject({
              statusCode: 401,
              data: { message: "You are not alowed to do that!" },
            });
          }

          for (let key in taskUpdate) {
            task[key] = taskUpdate[key];
          }

          task
            .save()
            .then((saveTask) => {
              saveTask === task;
              resolve({ statusCode: 200, data: { data: saveTask } });
            })
            .catch((error) => {
              reject({
                statusCode: 400,
                data: { message: "Task validation failed" },
              });
            });
        })
        .catch((error) => {
          reject({
            statusCode: 400,
            data: { message: error },
          });
        });
    });
  },

  deleteTaskById: (taskId) => {
    return new Promise(function (resolve, reject) {
      Task.findByIdAndDelete(taskId)
        .then((task) => {
          if (task) {
            reject({
              statusCode: 404,
              data: { message: "Id does not exist" },
            });
          }
          resolve({
            statusCode: 200,
            data: { message: `Delete ${taskId} successfully!` },
          });
        })
        .catch((error) => {
          reject({ statusCode: 500, data: { error: error } });
        });
    });
  },
};

module.exports = taskRepository;
