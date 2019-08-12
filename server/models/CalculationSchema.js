const mongoose = require('mongoose');
const uuidv1 = require('uuid/v1');

const { Schema } = mongoose;

const calculationSchema = new Schema({
  _id: {type: String, default: uuidv1},
  tokens: {type: Array}
});

mongoose.model('calculations', calculationSchema);
