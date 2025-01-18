const mongoose = require("mongoose");

async function ConnectToDB() {
  await mongoose.connect(
    "mongodb+srv://rajat:rajat123@cluster0.3fu6prp.mongodb.net/DevTinder?retryWrites=true&w=majority&appName=Cluster0"
  );
}

module.exports = { ConnectToDB };
