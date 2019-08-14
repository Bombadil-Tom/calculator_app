const mongoose = require('mongoose');

const keys = require('./config/keys');

const url =`mongodb+srv://${keys.dbUser}:${keys.dbPassword}@cluster0-qyc2d.mongodb.net/test?retryWrites=true&w=majority`;

mongoose.connect(url, {useNewUrlParser: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('worked');
  // we're connected!
});
