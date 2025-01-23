const mongoose = require("mongoose");
const userSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
    minLength: 4,
    maxLength: 50
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
    minLength: 4,
    maxLength: 50
  },
  age: { type: Number, required: true, min: 18, max: 60 },
  emailId: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String
  },
  gender: {
    type: String,
    required: true,
    lowercase: true,
    validate(value) {
      if (!["male", "female"].includes(value)) {
        throw new Error("Invalid Gender");
      }
    }
  },
  pictureUrl: {
    type: String,
    default: "https://cdn-icons-png.flaticon.com/128/3135/3135715.png"
  },

  skills: {
    type: [String],
    required: true
  }
});

const User = mongoose.model("User", userSchema);
module.exports = { User };
