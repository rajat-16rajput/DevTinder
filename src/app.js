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

//Converting the requested json objects into js objects at all Routes
app.use(express.json());

//POST Api to dyanamically add the data in the DB
app.post("/signUp", (req, res) => {
  const user = new User(req.body);

  try {
    user.save();
    res.send("User Added Successfully !");
  } catch (error) {
    res.status(400).send("No User Added");
  }
});

//GET Api to fetch a user by the emailId
app.get("/user", async (req, res) => {
  const userEmail = req.body.emailId;
  try {
    const users = await User.find({ emailId: userEmail });
    if (users.length === 0) {
      res.status(404).send("No User found!");
    } else {
      res.send(users);
    }
  } catch (err) {
    res.status(400).send("Something went wrong...");
  }
});

//GET Api to fetch all documents
app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({});
    if (users.length === 0) {
      res.status(404).send("No Users found");
    } else {
      res.send(users);
    }
  } catch (err) {
    res.send("Something went wrong");
  }
});

//DELETE Api to delete a user by ID
app.delete("/user", async (req, res) => {
  const id = req.body.id;
  try {
    await User.findByIdAndDelete(id);
    res.send("User Deleted Successfully");
  } catch (err) {
    res.send(err);
  }
});

//UPDATE Api to find and update user by ID
app.patch("/user", async (req, res) => {
  const id = req.body.id;
  const updatedUser = req.body;

  try {
    console.log(updatedUser);
    const result = await User.findByIdAndUpdate(id, updatedUser);
    console.log(updatedUser);
    if (result.length === 0) {
      res.status(404).send("No user found with Id : ", id);
    } else {
      res.send("User updated successfully");
    }
  } catch (err) {
    res.send(err);
  }
});
