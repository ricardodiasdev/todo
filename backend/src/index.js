const express = require("express");
const server = express();

server.use(express.json());
const TaskRoutes = require("./routes/TaskRoutes");

server.use("/", TaskRoutes);

server.listen(3000, () => {
  console.log("API ONLINE");
});
