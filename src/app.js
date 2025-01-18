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

//Converting the request json objects into js objects at all Routes
app.use(express.json());

app.post("/signUp", (req, res) => {
  const user = new User(req.body);

  try {
    user.save();
    res.send("User Added Successfully !");
  } catch (error) {
    res.status(400).send("No User Added");
  }
});
