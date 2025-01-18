//Importing Express Server
const express = require("express");

//Creating expres server
const app = express();

//Importing ConnectToDB() from database.js
const { ConnectToDB } = require("./Config/database");
const User = require("./Models/user");

ConnectToDB()
  .then(() => {
    console.log("Successfully Connected to the database");
    app.listen(7777, () => {
      console.log("Server Listening to port 7777");
    });
  })
  .catch((err) => {
    console.error("Couldn't connect to the database");
  });

app.post("/signup", async (req, res) => {
  const user = new User({
    firstName: "Steve",
    lastName: "Rogers",
    email: "Steve@Rogers.com"
  });

  try {
    await user.save();
    console.log("Added User data");
    res.send("User Added Successfully !");
  } catch (error) {
    res
      .status(400)
      .send("There was an error while adding the user to the collection");
  }
});
