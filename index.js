//console.log('Hello world');

// we are using this to see/ display something in the browser.
const express = require('express');  // require is a key word that anytime you want to use something.
const app = express(); 
// app is a variable
app.listen(3000, function(){ // 3000 is the port name
    console.log('listening on 3000') // console.log is to check if something is working
})



app.get ('/', function (req, res) {
    res.send ('Hello World')

})

