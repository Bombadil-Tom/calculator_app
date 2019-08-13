// keys.js figures out what credentials to use
if (process.env.NODE_ENV === 'ci') {
  module.exports = require('./ci');
} else{
  module.exports = require('./dev');
}
