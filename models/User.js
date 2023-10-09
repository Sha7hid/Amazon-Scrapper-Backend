const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  googleId: String,
  displayName: String,
  email: String,
  schedule: String, 
});

const User = mongoose.model('Users', userSchema);

module.exports = User;