const express = require("express");

const router = express.Router();
const userController = require("../controllers/user");
// const userController2 = require("../controllers/userController")
// Get All Users
// router.get("/", userController.getAllUser);
// // Get All Links
// router.get("/link", userController.getAllLink);
// // Save a User
// router.post("/add", userController.saveUser);
// // Save a Link
// router.post("/link/add", userController.saveLink);
// // GEt a Single User
// router.get("/user/:id", userController.getUser);
// // GEt a Single Link
// router.get("/link/:id", userController.getLink);
// // get product links for the user id given
// router.get("/link/userid/:id", userController.getProductLinksByUserId);
// // Update a User
// router.put("/user/edit/:id", userController.updateUser);
// // Update a Link
// router.put("/link/edit/:id", userController.updateLink);
// // Delete a User
// router.delete("/user/:id", userController.deleteUser);
// // Delete a Link
// router.delete("/link/:id", userController.deleteLink);
router.get('/api/user', userController.getAllUsers);

router.post('/api/user', userController.createUser);
router.get('/api/user/:id', userController.findUserById);
router.get('/api/user/google/:googleId', userController.findUserByGoogleId);
router.put('/api/user/:id', userController.updateUserById);
router.delete('/api/user/:id', userController.deleteUserById);
router.post('/api/productlink',userController.createProductLink);
router.get('/api/productlink',userController.getAllProductLinks)
router.get('/api/productlink/:id',userController.getProductLinkById)
router.get('/api/productlink/user/:userGoogleId',userController.getProductLinksByUser)
router.delete('/api/productlink/:id',userController.deleteProductLinkById)
router.put('/api/productlink/:id',userController.updateProductLinkById)
module.exports = router;