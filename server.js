const express = require('express');
const mongoose = require('mongoose');
const users = require('./routes/api/users');
const admin = require('./routes/api/admin');
const bodyParser = require('body-parser');
const passport = require('passport');
const app = express();
//Configuring DB
const { mongoURI } = require('./configs/keys');

//Body Parser  Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Connecting to the DB
mongoose
  .connect(mongoURI, { useNewUrlParser: true })
  .then(() => {
    console.log('Connected to DB');
  })
  .catch(err => {
    console.log(`Unable to connect to mongoDB due to ${err}`);
  });

// passport middleware
app.use(passport.initialize());
// passport config
require('./configs/passport.js')(passport);

app.use('/api/users', users);
app.use('/api/admin', admin);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port :  ${port}`));
