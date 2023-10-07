const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  googleId: String,
  displayName: String,
  email: String,
  schedule:Number
});


const nar = mongoose.model('Users', userSchema);

module.exports = nar;
