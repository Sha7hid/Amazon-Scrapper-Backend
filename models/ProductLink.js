const mongoose = require('mongoose');

const productLinkSchema = new mongoose.Schema({
  url: String,
  url2: String,
  url3: String,
  url4: String,
  url5: String,
  url6: String,
  url7: String,
  url8: String,
  url9: String,
  url10: String,
  // Add a boolean field to enable/disable the product link
  enabled: {
    type: Boolean,
    default: true, // Set the default value to true for enabled
  },
  // Reference to User model by googleId
  user: {
    type: String, // Assuming googleId is of type String in User schema
    ref: 'User', // Reference to the User model
  },
},
{
  timestamps: true, // Automatically add createdAt and updatedAt fields
});

const ProductLink = mongoose.model('ProductLink', productLinkSchema);

module.exports = ProductLink;
