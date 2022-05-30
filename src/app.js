const loaders = require("./loaders");
const express = require("express");
const path = require("path");

express().listen().close()

async function startServer() {
  const app = express();

  app.use(express.static(path.join(__dirname, 'public')));

  await loaders(app);

  const server = app.listen(process.env.PORT, (err) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log(`Your server is ready on port ${process.env.PORT}!`);
  });
}

startServer();
