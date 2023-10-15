const mongoose = require('mongoose');

const scrapDataSchema = new mongoose.Schema({
  name: String,
  reviewCount: String,
  rating: String,
  // Add a reference to ProductLink model by _id
  productLink: {
    type: String,
    ref: 'ProductLink',
  },
},
{
  timestamps: true, // Automatically add createdAt and updatedAt fields
});

const ScrapData = mongoose.model('ScrapData', scrapDataSchema);

module.exports = ScrapData;
