//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.use(bodyParser.json());

mongoose.connect("mongodb+srv://admin:Rishav12@cluster0.2jblw.mongodb.net/MemesDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Database Schema 

const memeSchema = {
  id: Number,
  name: String,
  caption: String,
  url: String
};

const Meme = mongoose.model("Meme", memeSchema);

// For storing the index of each meme
// x will always store the total number of entries in the database
// For next meme id will x+1
let x;

// GET request for displaying last 100 memes

app.get("/", function(req, res) {
  Meme.find({}, function(err, foundMemes) {
    x = foundMemes.length;
    res.render("meme", { allMemes: foundMemes} );
  });
});

// POST request for submitting the meme
app.post("/", function(req, res) {

  const name = req.body.name;
  const caption = req.body.caption;
  const url = req.body.url;

  const newMeme = new Meme({
    id: x + 1,
    name: name,
    caption: caption,
    url: url
  });

  newMeme.save();
  res.redirect("/");
});

// This will store the index of meme which is updated
let id;

// GET request with id because we will need it when 
// we have to update the database
app.get("/edit", function(req, res) {
  res.render("editMeme", {
    index: id
  });
});

// When edit button is clicked
// Find the value of id from button value
// Then redirect for it for get
app.post("/edit", function(req, res) {
  //console.log(req.body);
  id = req.body.index;
  res.redirect("/edit")
});

// POST request when edit page submit button is clicked
// Find the id in the database and update its content
// Then redirect it to root endpoint
app.post("/edit/meme", function(req, res) {
  //console.log(req.body);
  const newURL = req.body.url;
  const newCaption = req.body.caption;
  const id = req.body.update_index;

  Meme.updateOne({id: id}, {url: newURL, caption: newCaption}, function(err) {
    if (err) {
      console.log(err);
    } else {
      console.log("Successfully updated");
    }
  });
  res.redirect("/");
});




// For crio assessment

// Local Database
let memesList = [];

// Push data in array
app.post("/memes", (req, res) => {

  const name = req.body.name;
  const caption = req.body.caption;
  const url = req.body.url;
  const id = memesList.length + 1;

  const mem = {
    id: id,
    name: name,
    url: url,
    caption: caption
  };

  memesList.push(mem);
  res.status(200).send({
    id: id
  });
});

// GET request for all memes
app.get("/memes", (req, res) => {
  res.status(200).send(memesList);
});

// GET request for a particlar meme with given id
app.get("/memes/:id", (req, res) => {
  id = req.params.id;
  if (id > memesList.length) {
    res.sendStatus(400);
  } else {
  res.status(200).send(memesList[id - 1]);
  }
});

// PATCH request for editing a meme 
app.patch("/memes/:id", (req, res) => {
  id = req.params.id;
  newURL = req.body.url;
  newCaption = req.body.caption;

  if (id > memesList.length) {
    res.sendStatus(400);
  } else {
    memesList[id - 1].url = newURL;
    memesList[id - 1].caption = newCaption;

    res.sendStatus(200);
  }
});

let port = process.env.PORT;
if(port == null || port == "") {
  port =8081;
}

app.listen(port, function() {
  console.log("Server has started");
});
