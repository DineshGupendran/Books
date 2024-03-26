const express = require('express');
const app = express()
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const session = require('express-session');
dotenv.config();
const cors = require("cors");
const passport = require('passport');



var corsOptions = {
    origin: "http://localhost:4200",
  };
  
  app.use(cors(corsOptions));
  app.use(cors(corsOptions));
  
  // parse requests of content-type - application/json
  app.use(express.json());
  
  // parse requests of content-type - application/x-www-form-urlencoded
  //Body parser
  app.use(express.urlencoded({ extended: true }));
  app.use(session({
    secret:'oneboy',
    saveUninitialized: true,
    resave: true
  }));

  app.use(passport.initialize());
  app.use(passport.session());

  const database = process.env.MONGOLAB_URI;

  console.log('db', database)
  mongoose.set('strictQuery', true);
  mongoose.connect(database, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => { 
    console.log("Connected to the database!");
  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

  app.set('view engine', 'ejs');

//Routes
const book = require("./app/routes/book.route");
const bodyParser = require('body-parser');

app.use('/api/books', book);

app.use(bodyParser.json())


const PORT = process.env.PORT || 8080

app.listen(PORT, () => {
    console.log(`server listen on port ${PORT}`)
})