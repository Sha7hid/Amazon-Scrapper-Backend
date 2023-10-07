const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
});
const productLinkSchema = new mongoose.Schema({
    link: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Spider', // Reference to the User model
    },
  });
  
  const ProductLink = mongoose.model('ProductLink', productLinkSchema);

const User = mongoose.model('Spider', userSchema);

module.exports = {User,ProductLink}