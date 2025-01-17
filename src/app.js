//Importing Express Server
const express = require("express");
const { userAuth } = require("./Middlewares/auth");
//Creating expres server
const app = express();

//Making the server listen on Port 7777
app.listen(7777, () => {
  console.log("Server listening to port 7777");
});

//Adding a dummy middleware for all user API's except login

app.get("/user/getID", userAuth, (req, res) => {
  res.send("Id Sent successfully !");
});

app.get("/user/login", (req, res) => {
  res.send("Login Successsfull!!");
});
