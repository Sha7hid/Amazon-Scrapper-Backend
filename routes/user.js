const express = require("express");

const router = express.Router();
const userController = require("../controllers/user");
const { getUserScheduleByGoogleId } = require("../controllers/getUserScheduleController");

router.get('/api/user', userController.getAllUsers);
router.get('/api/user/schedule/:googleId',getUserScheduleByGoogleId)
router.post('/api/user', userController.createUser);
router.get('/api/user/:id', userController.findUserById);
router.get('/api/user/google/:googleId', userController.findUserByGoogleId);
router.put('/api/user/:id', userController.updateUserById);
router.put('/api/user/google/:googleId', userController.updateUserByGoogleId);
router.delete('/api/user/:id', userController.deleteUserById);
router.post('/api/productlink',userController.createProductLink);
router.get('/api/productlink',userController.getAllProductLinks)
router.get('/api/productlink/:id',userController.getProductLinkById)
router.get('/api/productlink/user/:userGoogleId',userController.getProductLinksByUser)
router.delete('/api/productlink/:id',userController.deleteProductLinkById)
router.put('/api/productlink/:id',userController.updateProductLinkById)
router.get('/api/latestproductlink/user/:userGoogleId',userController.getLatestProductLinksByUser);
router.post('/api/scrap',userController.createScrapData);
router.get('/api/scrap',userController.getAllScrapData)
router.get('/api/scrap/:id',userController.getScrapDataById)
router.get('/api/scrap/productlink/:productLinkId',userController.getScrapDataByProductLinkId)
router.put('api/user/emails/:googleId', userController.updateUserEmailsByGoogleId);
module.exports = router;