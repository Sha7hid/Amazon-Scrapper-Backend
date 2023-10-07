// const { User } = require("../models/schema");
// const { ProductLink } = require("../models/schema");
const nar = require('../models/User'); 
const ProductLink = require('../models/ProductLink');
// const getAllUser = (req, res, next) => {
//   User.find().then(function(data){
//       res.send(data);
//     }).catch(function(err) {
//       console.log(err);
//     });

// };
// const getAllLink = (req, res, next) => {
//     ProductLink.find().then(function(data){
//         res.send(data);
//       }).catch(function(err) {
//         console.log(err);
//       });
  
//   };

//   const saveUser = (req, res, next) => {
//     const user= new User({
//       email: req.body.email
//     });
//     user.save().then(function(data){
//         res
//           .status(200)
//           .json({
//             code: 200,
//             message: "User Added Successfully",
//             adduser: data,
//           });
          
//          }).catch(function(err) {
//             console.log(err);
//           });
  
//   };


// const saveLink = (req, res, next) => {
//   const link = new ProductLink({
//     link: req.body.link,
//     user:req.body.user
//   });
//   link.save().then(function(data){
//       res
//         .status(200)
//         .json({
//           code: 200,
//           message: "link Added Successfully",
//           addlink: data,
//         });
        
//        }).catch(function(err) {
//           console.log(err);
//         });

// };

// const getUser = (req, res, next) => {
//   User.findById(req.params.id).then(function(data) {
//       res.send(data);
//     }).catch(function(err){ 
//       console.log(err);
//     });
  
// };
// const getLink = (req, res, next) => {
//     ProductLink.findById(req.params.id).then(function(data) {
//         res.send(data);
//       }).catch(function(err){ 
//         console.log(err);
//       });
    
//   };
  

// const updateUser = (req, res, next) => {
//   const user = {
//      email: req.body.email,
//   };
//   User.findByIdAndUpdate(
//     req.params.id,
//     { $set: user },
//     { new: true }).then(function(data)  {
     
//         res
//           .status(200)
//           .json({
//             code: 200,
//             message: "User Updated Successfully ",
//             updateuser: data,
//           });
//       }).catch(function(err) {
//         console.log(err);
//       })
  
// };
// const updateLink = (req, res, next) => {
//     const link = {
//        link: req.body.link,
//     };
//     ProductLink.findByIdAndUpdate(
//       req.params.id,
//       { $set: link },
//       { new: true }).then(function(data)  {
       
//           res
//             .status(200)
//             .json({
//               code: 200,
//               message: "Link Updated Successfully ",
//               updatelink: data,
//             });
//         }).catch(function(err) {
//           console.log(err);
//         })
    
//   };

// const deleteUser = (req, res, next) => {
//   User.findByIdAndDelete(req.params.id).then(function(data) {
//       res
//         .status(200)
//         .json({
//           code: 200,
//           message: "User Deleted Successfully",
//           deleteuser: data,
//         });
//     }).catch(function(err) {
//       console.log(err);
//     })

// };
// const deleteLink = (req, res, next) => {
//     ProductLink.findByIdAndDelete(req.params.id).then(function(data) {
//         res
//           .status(200)
//           .json({
//             code: 200,
//             message: "Link Deleted Successfully",
//             deleteuser: data,
//           });
//       }).catch(function(err) {
//         console.log(err);
//       })
  
//   };
//   const getProductLinksByUserId = (req, res, next) => {
//     const userId = req.params.id; // Get the user ID from the request parameters
  
//     ProductLink.find({ user: userId })
//       .then(function (data) {
//         res.status(200).json({
//           code: 200,
//           productLinks: data,
//         });
//       })
//       .catch(function (err) {
//         console.log(err);
//         res.status(500).json({
//           code: 500,
//           message: "Error fetching product links for the user",
//         });
//       });
//   };
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
    const { googleId, displayName, email } = req.body;
    
    // Check if the user already exists in MongoDB
    let user = await nar.findOne({ googleId });

    if (!user) {
      // If the user doesn't exist, create a new user and save it to MongoDB
      user = await nar.create({
        googleId,
        displayName,
        email,
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
const updateUserById = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const updateData = req.body;
    const updatedUser = await User.findByIdAndUpdate(userId, updateData, { new: true });
    
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

  

module.exports = {
  // getAllUser,
  // getAllLink,
  // saveUser,
  // saveLink,
  // getUser,
  // getLink,
  // updateUser,
  // updateLink,
  // deleteUser,
  // deleteLink,
  // getProductLinksByUserId,

  createUser,
  getAllUsers,
findUserById,
updateUserById,
deleteUserById,
createProductLink,
getAllProductLinks,
getProductLinksByUser,
getProductLinkById,
updateProductLinkById,
deleteProductLinkById,
findUserByGoogleId
};