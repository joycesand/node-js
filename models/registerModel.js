
// creates app by calling express.
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

// Creating a Schema definition means a Data Structure
const registerSchema = new mongoose.Schema({
    first_name: {
      type: String,
      required: "Please Enter your First name"
    },
  
    last_name:  {
      type: String,
      required: "Please Enter your Last name"
    },
    gender: {
      type: String,
      required: "gender"
    },
    country: {
      type: String,
      required: "country"
    },
    city: {
      type: String,
      required: "city"
    }
  });
  
  module.exports = mongoose.model("Register", registerSchema);
  