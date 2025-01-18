//Importing Express Server
const express = require("express");

//Creating expres server
const app = express();

//Importing ConnectToDB() from database.js

const { ConnectToDB } = require("./Config/database");

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
