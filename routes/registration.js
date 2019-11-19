const express = require('express')
const router  = express.Router()
const Register = require('../models/registerModel')

//ROUTES  for displaying data to the browser
router.get('/', (req, res) => {
res.render ('register')
    })

// For getting Data to Post on another Page and saving it to the DATABASE.
router.post("/", (req, res) => {
    const register = new Register(req.body);
    register.save() // save a new document to the DataBase.
      .then(item => {
        Register.find().then(
          items => {
          res.render("list", { users: items });
        });
      })
      .catch(err => {
        res.status(500).send("Unable to Save to Database");
      });
  });


// module export should always be at the bottom 0
module.exports = router;