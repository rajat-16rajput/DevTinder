//Importing Express Server
const express = require("express");

//Creating expres server
const app = express();

//Making the server listen on Port 7777
app.listen(7777, () => {
  console.log("Server listening to port 7777");
});

//Note : For a specific route only one response is valid and is sent.
//Adding multiple responses wont work since only the first response is sent due to synchronous behaviour of JS.
app.use(
  "/about",
  (req, res, next) => {
    next();
  },
  [
    (req, res, next) => {
      console.log("Array1");
      next();
    },
    (req, res, next) => {
      console.log("Array2");
      next();
    }
  ],
  (req, res, next) => {
    next();
  },
  (req, res) => {
    res.send("Hello 4");
  }
);
