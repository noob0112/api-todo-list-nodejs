const router = require("../commons/route.common.js")
const task = require("./task.js");
const auth = require("./auth.js");

function route(app) {
  router(app, "/", auth);
  router(app, "/task", task);
}

module.exports = route;
