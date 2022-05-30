const User = require("../models/User");

const userRepository = {
  createUser: (user) => {
    return new Promise(function (resolve, reject) {
      user
        .save()
        .then((user) => {
          resolve({
            statusCode: 201,
            data: {
              name: user.name,
              email: user.email,
              _id: user._id,
              createdAt: user.createdAt,
              updatedAt: user.updatedAt,
            },
          });
        })
        .catch((error) => {
          reject({ statusCode: 400, data: error });
        });
    });
  },

  findOneUser: (query) => {
    return new Promise(function (resolve, reject) {
      User.findOne(query)
        .then((user) => {
          if (!user) {
            reject({
              statusCode: 400,
              message: "Element does not exist",
            });
          }
          resolve({ statusCode: 200, data: user });
        })
        .catch((error) => {
          reject({ statusCode: 400, data: { message: error } });
        });
    });
  },

  findUserById: (userId) => {
    return new Promise(function (resolve, reject) {
      User.findById(userId)
        .then((user) => {
          if (!user) {
            reject({
              statusCode: 404,
              data: { message: "Task does not exist" },
            });
          }
          resolve({ statusCode: 200, data: user });
        })
        .catch((error) => {
          reject({ statusCode: 500, data: { message: error } });
        });
    });
  },

  findByIdAndAddTask: (userId, taskId) => {
    return new Promise(function (resolve, reject) {
      User.findByIdAndUpdate(
        userId,
        { $addToSet: { tasks: taskId } },
        {
          new: true,
        }
      )
        .then((data) => {
          if (data) {
            resolve({ data: data });
          } else {
            reject({ error: "Id does not exist" });
          }
        })
        .catch((error) => {
          reject({ error });
        });
    });
  },

  findUserByIdAndRemmoveTask: (userId, taskId) => {
    return new Promise(function (resolve, reject) {
      User.findByIdAndUpdate(userId, { $pull: { tasks: taskId } })
        .then((user) => {
          if (!user.tasks) {
            reject({
              statusCode: 401,
              data: {
                message: "You are not alowed to do that!",
              },
            });
          }
          resolve({ statusCode: 200, data: { data: user } });
        })
        .catch((error) => {
          reject({ statusCode: 404, data: { message: "Token is not valid!" } });
        });
    });
  },
};

module.exports = userRepository;
