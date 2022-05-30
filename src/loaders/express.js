const bodyParser = require("body-parser");
const path = require('path');
const morgan = require("morgan");
const cors = require("cors");
const { engine } = require("express-handlebars");

// Config log
const logger = morgan(
  `:remote-addr - :remote-user [:date[iso]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent"`
);

module.exports = async (app) => {
  app.get("/status", (req, res) => {
    res.status(200).end();
  });
  app.head("/status", (req, res) => {
    res.status(200).end();
  });
  app.enable("trust proxy");

  app.use(cors());
  app.use(logger);
  app.use(bodyParser.urlencoded({ extended: false, limit: "20mb" }));
  app.use(bodyParser.json({ limit: "20mb" }));

  app.engine("hbs", engine({
    extname: '.hbs'
  }));
  app.set("view engine", "hbs");
  app.set("views", "./src/views");

  app.get('/', (req, res) => {
    res.render('pages/home')
  })

  return app;
};
