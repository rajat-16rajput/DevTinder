//Importing Express Server
const express = require("express");

//Creating expres server
const app = express();

const { ConnectToDB } = require("./Config/database");
const { User } = require("./Model/User");
const { ReturnDocument } = require("mongodb");
const { validateSignup } = require("./Utils/validation");

//importing bcrypt
const bcrypt = require("bcrypt");

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
app.post("/signUp", async (req, res) => {
  try {
    //Validate
    validateSignup(req);
    const { firstName, lastName, emailId, password } = req.body;
    //Encrypt
    const hashedPassword = await bcrypt.hash(password, 10);

    //Save the user
    const user = new User({
      firstName,
      lastName,
      emailId,
      password: hashedPassword
    });
    await user.save();
    res.send("User Added Successfully !");
  } catch (error) {
    res.status(400).send({ error: error.message || "Something went wrong." });
  }
});

app.post("/login", async (req, res) => {
  const { emailId, password } = req.body;
  try {
    const user = await User.findOne({ emailId: emailId });
    if (user === null) {
      throw new Error("User not found");
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error("Incorrect password");
    } else {
      res.send("Login Successful!!!");
    }
  } catch (err) {
    res.status(400).send(err.message);
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
  const { playerId, ...updatedUser } = req.body;
  try {
    //Adding API level Validations
    const ALLOWED_UPDATES = ["pictureUrl", "skills", "password"];
    const isUpdateAllowed = Object.keys(updatedUser).every((k) =>
      ALLOWED_UPDATES.includes(k)
    );
    if (!isUpdateAllowed) {
      throw new Error("Update not allowed");
    }
    const result = await User.findByIdAndUpdate(playerId, updatedUser, {
      returnDocument: "after",
      runValidators: true
    });
    if (!result) {
      res.status(404).send("No user found with Id : ", playerId);
    } else {
      res.send(result);
      console.log(result);
    }
  } catch (err) {
    res.status(400).send(err.message);
  }
});
