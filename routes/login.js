const express = require("express");
const router = express.Router();
const Register = require("../models/registerModel");

//ROUTES  for displaying data to the browser
router.get("/", (req, res) => {
  res.render("login");
});

// submits a login page information
router.post('/', async(req, res) => {
  // console.log(req.body);
  try{
      const user = await Register.authenticate(req.body.username, req.body.password);
      req.session.user = user;
      // res.send("hey " + user.first_name + " " + user.last_name)
     
      res.redirect('register/search')
        
      // const items = await Register.find();          
      //     res.render("list", { users: items , Name: user.last_name +" "+user.first_name });
      
  }catch{
    res.render('login', {error: 'failed to login'})

    
    // return res.status(500).send("Unable to Log in");
      // res.redirect('register')
  }
})

// module export should always be at the bottom 0
module.exports = router;
