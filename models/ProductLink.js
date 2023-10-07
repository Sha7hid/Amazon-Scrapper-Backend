const mongoose = require('mongoose');

const productLinkSchema = new mongoose.Schema({
    url: String,
    url2:String,
    url3:String,
    url4:String,
    url5:String,
    url6:String,
    url7:String,
    url8:String,
    url9:String,
    url10:String,
    // Reference to User model by googleId
    user: {
      type: String, // Assuming googleId is of type String in User schema
      ref: 'User', // Reference to the User model
    },
    // Add any other fields relevant to your product link
  });
  
  const ProductLink = mongoose.model('ProductLink', productLinkSchema);
  module.exports = ProductLink;