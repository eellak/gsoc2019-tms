const express = require("express");
const router = express.Router();

const adminController = require('../controllers/admin');
const checkAuth = require('../middleware/check-auth');
const externalController= require('../controllers/external')

//URL: /admin
router.post("/create_external",checkAuth,adminController.is_admin,externalController.user_signup); //create external
router.get("/get_externals",checkAuth,adminController.is_admin,adminController.get_externals); //get all externals
router.get("/get_external/:userId",checkAuth,adminController.is_admin,adminController.get_external_byId); //get external by id
router.delete("/delete_external/:userId",checkAuth,adminController.is_admin,adminController.delete_external); //delete external

router.get("/get_users",checkAuth,adminController.is_admin,adminController.get_users); //get all users
router.get("/get_user/:userId",checkAuth,adminController.is_admin,adminController.get_user_byId); //get user by id
router.delete("/delete_user/:userId",checkAuth,adminController.is_admin,adminController.delete_user); //delete user

router.post("/apply_period",checkAuth,adminController.is_admin,adminController.apply_period);
router.post("/create_thesis_period",checkAuth,adminController.is_admin,adminController.create_thesis_period);

//router.get("/completed", adminController.thesis_completed_get_all); // 
 


module.exports = router;
