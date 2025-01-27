const validator = require("validator");

function validateSignup(req) {
  const { firstName, lastName, password, emailId } = req.body;

  if (!firstName || !lastName || !password || !emailId) {
    throw new Error("Please enter all mandatory field values");
  }
  if (firstName.length < 4 || firstName.length > 50) {
    throw new Error(
      "The firstName should be greater than 4 and less than 50 characters in length"
    );
  }

  if (lastName.length < 4 || lastName.length > 50) {
    throw new Error(
      "The lastName should be greater than 4 and less than 50 characters in length"
    );
  }
  if (!validator.isEmail(emailId)) {
    throw new Error("Invalid Email entered");
  }

  if (!validator.isStrongPassword(password)) {
    throw new Error(
      "Password shoud contain atleast 1 uppercase letter, 1 lowercase, 1 special character, 1 number"
    );
  }
}

module.exports = { validateSignup };
