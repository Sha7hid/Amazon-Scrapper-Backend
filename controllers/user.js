
const nar = require('../models/User'); 
const ProductLink = require('../models/ProductLink');
const ScrapData = require('../models/Scrap');

  // Get all user data
  const getAllUsers = async (req, res, next) => {
    try {
      const users = await nar.find();
      return res.status(200).json(users);
    } catch (error) {
      next(error);
    }
  };
// Create a new user and save it to the database
const createUser = async (req, res, next) => {
  try {
    const { googleId, displayName, email,schedule } = req.body;
    
    // Check if the user already exists in MongoDB
    let user = await nar.findOne({ googleId });

    if (!user) {
      // If the user doesn't exist, create a new user and save it to MongoDB
      user = await nar.create({
        googleId,
        displayName,
        email,
        schedule
        // Add any additional user data you want to store
      });
    }

    return res.status(201).json(user);
  } catch (error) {
    next(error); // Pass the error to the error handler middleware
  }
};




// Find a user by their  ID
const findUserById = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const user = await nar.findById(userId);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};
// Find a user by their Google ID
const findUserByGoogleId = async (req, res, next) => {
  try {
    const googleId = req.params.googleId;
    const user = await nar.findOne({ googleId });
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

// Update user information by Google ID
const updateUserByGoogleId = async (req, res, next) => {
  try {
    const googleId = req.params.googleId; // Assuming the Google ID is passed as a URL parameter
    const updateData = req.body; // The data you want to update

    // Find and update the user by their Google ID
    const updatedUser = await nar.findOneAndUpdate({ googleId }, updateData, { new: true });

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.status(200).json(updatedUser);
  } catch (error) {
    next(error);
  }
};


// update user using _id
const updateUserById = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const updateData = req.body;
    const updatedUser = await nar.findByIdAndUpdate(userId, updateData, { new: true });
    
    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.status(200).json(updatedUser);
  } catch (error) {
    next(error);
  }
};

// Delete a user by Google ID
const deleteUserById = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const deletedUser = await User.findByIdAndRemove(userId);
    
    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.status(204).json(); // No content
  } catch (error) {
    next(error);
  }
};
const createProductLink = async (req, res, next) => {
  try {
    const { url,url2,url3,url4,url5,url6,url7,url8,url9,url10, user } = req.body;
    
    // Create a new ProductLink and associate it with the specified user's googleId
    const productLink = await ProductLink.create({ url, url2,url3,url4,url5,url6,url7,url8,url9,url10, user });

    return res.status(201).json(productLink);
  } catch (error) {
    next(error);
  }
};
const getAllProductLinks = async (req, res, next) => {
  try {
    const productLinks = await ProductLink.find();
    return res.status(200).json(productLinks);
  } catch (error) {
    next(error);
  }
};
const getProductLinkById = async (req, res,next) => {
  try {
    const productId = req.params.id;
    const productLink = await ProductLink.findById(productId);
    
    if (!productLink) {
      return res.status(404).json({ message: 'ProductLink not found' });
    }

    return res.status(200).json(productLink);
  } catch (error) {
    next(error);
  }
};
const updateProductLinkById = async (req, res, next) => {
  try {
    const productId = req.params.id;
    const updateData = req.body;
    const updatedProductLink = await ProductLink.findByIdAndUpdate(productId, updateData, { new: true });
    
    if (!updatedProductLink) {
      return res.status(404).json({ message: 'ProductLink not found' });
    }

    return res.status(200).json(updatedProductLink);
  } catch (error) {
    next(error);
  }
};
const deleteProductLinkById = async (req, res, next) => {
  try {
    const productId = req.params.id;
    const deletedProductLink = await ProductLink.findByIdAndRemove(productId);
    
    if (!deletedProductLink) {
      return res.status(404).json({ message: 'ProductLink not found' });
    }

    // Remove the reference to this product link from the associated user's document
    const user = await User.findOne({ googleId: deletedProductLink.user });
    if (user) {
      const indexToRemove = user.productLinks.indexOf(productId);
      if (indexToRemove !== -1) {
        user.productLinks.splice(indexToRemove, 1);
        await user.save();
      }
    }

    return res.status(204).json(); // No content
  } catch (error) {
    next(error);
  }
};
const getProductLinksByUser = async (req, res, next) => {
  try {
    const userGoogleId = req.params.userGoogleId;
    const productLinks = await ProductLink.find({ user: userGoogleId });
    return res.status(200).json(productLinks);
  } catch (error) {
    next(error);
  }
};

const getLatestProductLinksByUser = async (req, res, next) => {
  try {
    const userGoogleId = req.params.userGoogleId;
    // Find the latest product links for the specified user based on the 'createdAt' field
    const latestProductLinks = await ProductLink
      .find({ user: userGoogleId })
      .sort({ createdAt: -1 }).limit(1) // Sort in descending order (latest first)
    return res.status(200).json(latestProductLinks);
  } catch (error) {
    next(error);
  }
};
const createScrapData = async (req, res, next) => {
  try {
    const { name, reviewCount, rating, productLinkId } = req.body;

    // Create a new ScrapData entry and associate it with the specified product link
    const scrapData = await ScrapData.create({ name, reviewCount, rating, productLink: productLinkId });

    return res.status(201).json(scrapData);
  } catch (error) {
    next(error);
  }
};
const getAllScrapData = async (req, res, next) => {
  try {
    const scrapDataEntries = await ScrapData.find();
    return res.status(200).json(scrapDataEntries);
  } catch (error) {
    next(error);
  }
};
const getScrapDataById = async (req, res, next) => {
  try {
    const scrapDataId = req.params.id;
    const scrapData = await ScrapData.findById(scrapDataId);

    if (!scrapData) {
      return res.status(404).json({ message: 'ScrapData not found' });
    }

    return res.status(200).json(scrapData);
  } catch (error) {
    next(error);
  }
};
const getScrapDataByProductLinkId = async (req, res, next) => {
  try {
    const productLinkId = req.params.productLinkId;
    // Find all ScrapData entries associated with the specified product link
    const scrapData = await ScrapData.find({ productLink: productLinkId });

    return res.status(200).json(scrapData);
  } catch (error) {
    next(error);
  }
};
// Update user emails by Google ID
const updateUserEmailsByGoogleId = async (req, res, next) => {
  try {
    const googleId = req.params.googleId; // Assuming the Google ID is passed as a URL parameter
    const emails = req.body; // The updated email values

    // Find and update the user by their Google ID
    const updatedUser = await nar.findOneAndUpdate({ googleId }, emails, { new: true });
console.log(updatedUser)
    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.status(200).json(updatedUser);
  } catch (error) {
    next(error);
  }
};

  

module.exports = {
  createUser,
  getAllUsers,
findUserById,
updateUserById,
updateUserByGoogleId,
deleteUserById,
createProductLink,
getAllProductLinks,
getProductLinksByUser,
getProductLinkById,
updateProductLinkById,
deleteProductLinkById,
findUserByGoogleId,
getLatestProductLinksByUser,
createScrapData,
getAllScrapData,
getScrapDataById,
getScrapDataByProductLinkId,
updateUserEmailsByGoogleId
};