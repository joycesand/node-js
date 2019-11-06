//console.log('Hello world');

// we are using this to see/ display something in the browser.
const express = require('express');  // require is a key word that anytime you want to use something.
const app = express(); 
// app is a variable
app.listen(3000,() => { // 3000 is the port name
    console.log('listening on 3000') // console.log is to check if something is working
})



app.get ('/', (req, res) => {
    res.send ('Hello World')

})

app.post('/', (req, res) => {
    res.send ('Got a Post request')
})


app.put ('/', (req, res) => {
    res.send ('Got a Put request')
})

app.delete ('/', (req, res) => {
    res.send ('Got a DELETE request ')
})

app.get('/users/:name', (req, res) => {
    res.send ('Hello' + req.params.name)
});


app.get('*', (req, res) => {
    res.send ('sorry there is an error')
});





