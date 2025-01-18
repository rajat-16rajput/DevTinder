//Importing Express Server
const express = require("express");

//Creating expres server
const app = express();

const { ConnectToDB } = require("./Config/database");
const { User } = require("./Model/User");
//Making the server listen on Port 7777
ConnectToDB()
  .then(() => {
    console.log("Successfully Connected to the DB");
    app.listen(7777, () => {
      console.log("Server listening to port 7777");
    });
  })
  .catch((err) => {
    console.log("Something went wrong... Couldn't connect to DB");
  });

app.post("/signUp", (req, res) => {
  const rohit = {
    firstName: "Rohit",
    lastName: "Sharma",
    age: 37,
    email: "rohit@hittu.com",
    gender: "Male"
  };
  const user = new User(rohit);

  try {
    user.save();
    res.send("User Added Successfully !");
  } catch (error) {
    res.status(400).send("No User Added");
  }
});
