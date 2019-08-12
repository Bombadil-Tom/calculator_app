const mongoose = require('mongoose');

let keys;

if (process.env.NODE_ENV === 'ci') {
  keys = require('./ciKeys');
} else{
  keys = require('./keys');
}

const url =`mongodb+srv://${keys.dbUser}:${keys.dbPassword}@cluster0-qyc2d.mongodb.net/test?retryWrites=true&w=majority`;

mongoose.connect(url, {useNewUrlParser: true});
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('worked');
  // we're connected!
});