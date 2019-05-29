const express = require("express"); // importing a CommonJS module
const helmet = require("helmet");

const hubsRouter = require("./hubs/hubs-router.js");

const server = express();

// global middleware
server.use(express.json()); // built-in middleware provided by express
server.use(helmet());
server.use(logger);

server.use("/api/hubs", hubsRouter);

server.get("/", addName, (req, res) => {
  const nameInsert = req.name ? ` ${req.name}` : "";

  res.send(`
    <h2>Lambda Hubs API</h2>
    <p>Welcome${nameInsert} to the Lambda Hubs API</p>
    `);
});

function logger(req, res, next) {
  console.log(`A ${req.method} request to '${req.url}'`);
  next();
}

function addName(req, res, next) {
  console.log("\nname added\n");
  req.name = "Web XIX";
  next();
}

function stopRequest(req, res, next) {
  res.status(401).json({ message: "you shall not pass!" });
}

module.exports = server;
