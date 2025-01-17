//Importing Express Server
const express = require("express");
const { adminAuth } = require("./Middlewares/auth");
//Creating expres server
const app = express();

//Making the server listen on Port 7777
app.listen(7777, () => {
  console.log("Server listening to port 7777");
});

//Middleware for admin api's
app.use("/admin", adminAuth);

app.get("/admin/getUser", (req, res) => {
  res.send("All Data sent");
});

app.get("/admin/deleteUser", (req, res) => {
  res.send("User deleted");
});
