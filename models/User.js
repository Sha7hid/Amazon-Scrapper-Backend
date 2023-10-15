const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  googleId: String,
  displayName: String,
  email: String,
  schedule: String, 
  email2: String,
  email3: String
});

const User = mongoose.model('Users', userSchema);

module.exports = User;

