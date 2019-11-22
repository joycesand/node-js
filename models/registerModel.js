// creates app by calling express.
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const bcryptjs = require("bcryptjs");

// Creating a Schema definition means a Data Structure
const registerSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: (true, "Please Enter your First name")
  },

  last_name: {
    type: String,
    required: (true, "Please Enter your Last name")
  },
  username: {
    type: String,
    unique: true,
    required: (true, "Please Enter your Last name")
  },

  gender: {
    type: String,
    required: (true, "Please choose Gender")
  },
  email: {
    type: String,
    required: (true, "Please Enter your Email")
  },
  password: {
    type: String,
    required: (true, "Please Enter your Password")
  },
  country: {
    type: String,
    required: (true, "Please choose your Country")
  },
  city: {
    type: String,
    required: (true, "Please choose your City")
  }
});

// Hashing a password before saving it to the database pre-save hook.
registerSchema.pre("save", function(next) {
  this.password = bcryptjs.hashSync(this.password, 10); // 10 is the salt
  next();
});

registerSchema.statics.authenticate = async function(username, password) {
  const user = await this.findOne({ username: username });
  if (!user) {
    throw new Error("User not found.");
  }
  const match = await bcryptjs.compare(password, user.password);
  if (match) {
    return user;
  }
};

module.exports = mongoose.model("Register", registerSchema);
