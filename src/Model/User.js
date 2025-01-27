const mongoose = require("mongoose");
const validator = require("validator");
const userSchema = new mongoose.Schema(
  {
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
    age: { type: Number, min: 18, max: 60 },
    emailId: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Invalid Email", value);
        }
      }
    },
    password: {
      type: String,
      required: true,
      validate(value) {
        if (!validator.isStrongPassword(value)) {
          throw new Error(
            "Weak Password  minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1"
          );
        }
      }
    },
    gender: {
      type: String,

      lowercase: true,
      validate(value) {
        if (!["male", "female"].includes(value)) {
          throw new Error("Invalid Gender");
        }
      }
    },
    pictureUrl: {
      type: String,
      default: "https://cdn-icons-png.flaticon.com/128/3135/3135715.png",
      validate(value) {
        if (!validator.isURL(value)) {
          throw new error("Invalid Photo URL");
        }
      }
    },
    skills: {
      type: [String]
      // required: true
    },
    about: {
      type: String,
      default: "This is default about"
    }
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
module.exports = { User };
