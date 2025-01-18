//Importing Express Server
const express = require("express");
const { userAuth } = require("./Middlewares/auth");
//Creating expres server
const app = express();

//Making the server listen on Port 7777
app.listen(7777, () => {
  console.log("Server listening to port 7777");
});

//Adding a WildCard Error Handler

app.get("/getUserData", (req, res) => {
  throw new Error("Eorrrorororororor");
  res.send("Fetched user Data"); //Wont execute due to Error above
});

app.use("/", (err, req, res, next) => {
  if (err) {
    res.status(500).send("Something went wrong...");
  }
});
