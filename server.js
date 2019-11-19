// REFACTORING CODE / ORGANISING COD
// creates app by calling express.
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const multer = require("multer");
const path = require("path");
const fs= require('fs') // requring the file system
const mongodb = require("mongodb");
//to use express in node u use app.
const app = express();
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));
// body-parser to parse request body data. if not used it show undefined data.
app.use(bodyParser.urlencoded({ extended: true })); //becoz we are getting  the data from a url.

// creating the storage.
var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "uploads");
  },
  filename: function(req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  }
});

// initialising multer
var upload = multer({
  storage: storage
});

// configuring mongodb and connecting to mongo campus
var MongoClient = mongodb.MongoClient;
const url = "mongodb://localhost:27017";
//
MongoClient.connect(
  url,
  {
    useUnifiedTopology: true,
    useNewUrlParser: true
  },
  (err, client) => {
    // call back
    if (err) return console.log(err); // checking for error

    db = client.db("images");
    app.listen(3001, () => {
      console.log("Mongodb server Listening at 3001");
    });
  }
);

var nameSchema = new mongoose.Schema({
  firstname: String,
  lastname: String
});

// Mongoose connects the app to the mongoDB.
mongoose.connect("mongodb://localhost:27017/demo-db");

app.get("/", (req, res) => {
  res.render("register");
});

// configuring the upload file route
app.post("/uploadfile", upload.single("myFile"), (req, res, next) => {
  const file = req.file; // fetches the files
  // check if the file exist
  if (!file) {
    const error = new Error("Please upload a file");
    console.log(file);
    error.httpStatusCode = 400;
    return next(error);
  }
  res.send(file);
});

// configure the multiple file routes
app.post("/uploadmultiple", upload.array("myFiles", 2), (req, res, next) => {
  const files = req.files;

  if (!files) {
    const error = new Error("Please choose files");
    error.httpStatusCode = 400;
    return next(error);
  }
});

// configuring image upload to the database
app.post("/uploadphoto", upload.single('myImage'),(req,res) => {
    var img = fs.readFileSync(req.file.path)
    var encode_image = img.toString('base64')

    // Defining a JSON Object for the image
var finalImg = {
  contentType:req.file.mimetype,
  path: req.file.path,
  image: new Buffer(encode_image,'base64')
}; // not working

// Insert the image to the database
db.collection('image').insertOne(finalImg,(err,result) => {
  console.log(result);
  if(err) return console.log(err);

  console.log("Saved to database")
  res.contentType(finalImg.contentType)
  res.send(finalImg.images)

})
})

// import routes
const registrationRoutes = require("./routes/registration");
app.use("/registration", registrationRoutes);

// configuring the home route

//Setting the server and to Listen to port 3000
app.listen(3000, () => {
  console.log("listening on 3000");
});
