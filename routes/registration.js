const express = require('express')
const router = express.Router()
const Register = require('../models/registerModel')

//ROUTES  for displaying data to the browser
router.get('/', (req, res) => {
  res.render('register')
})

// For getting Data to Post on another Page and saving it to the DATABASE.
router.post("/", async (req, res) => {
  console.log(req.body);
  const myRegister = new Register(req.body);
  try {
    await myRegister.save();
    const items = await Register.find();
    res.redirect('/login')
  } catch (err) {

    res.status(500).send("Unable to Save to Database");
    res.render('register')
  }
});

  // returns a specific page
  router.get('/search', async (req, res) => {
    if (req.session.user) {
      // console.log (req.session.user)
      // try {
      const items = await Register.find()
      res.render("list", { users: items, currentUser: req.session.user });
    
    }else {
      res.redirect('/login')
    }

  });
  /*  myRegister.save() // save a new document to the DataBase.
     .then(
 
       /*
 items => {
       Register.find().then(
         items => {
         res.render("list", { registers: items });
       });
       
       res.render('login')
     )
     .catch(err => {
       res.status(500).send("Unable to Save to Database");
     }); */
  // });


  //authenticate input against database


  //get route for login page
  // router.get('/login', (req, res) => {
  //   res.render ('login')
  //       })



  // module export should always be at the bottom 0
  module.exports = router;