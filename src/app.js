//Importing Express Server
const express = require("express");

//Creating expres server
const app = express();

//Making the server listen on Port 7777
app.listen(7777, () => {
  console.log("Server listening to port 7777");
});

//Adding Request Handlers

//Request handler for requests coming at path /hello
app.use("/hello", (req, res) => {
  res.send("Hello World from Hello");
});

//Request Handler for requests coming at the path /test
app.use("/test", (req, res) => {
  res.send("Hello From Test");
});

//Keeping / Request handler at the bottom for default scenario
app.use("/", (req, res) => {
  res.send("Global HEllo WOrld");
});
