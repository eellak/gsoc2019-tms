const express = require("express");
const router = express.Router();

const adminController = require('../controllers/admin');
const checkAuth = require('../middleware/check-auth');
const externalController= require('../controllers/external_login')

//URL: /admin
router.post("/create_external",checkAuth,adminController.is_admin,externalController.user_signup); //create user
router.get("/:adminId/get_externals",checkAuth,adminController.is_admin,adminController.get_externals); //get all users
router.get("/:adminId/get_external/:userId",checkAuth,adminController.is_admin,adminController.get_external_byId); //get user by id
router.delete("/:adminId/delete_external/:userId",checkAuth,adminController.is_admin,adminController.delete_external); //delete user

router.get("/:adminId/get_users",checkAuth,adminController.is_admin,adminController.get_users); //get all users
router.get("/:adminId/get_user/:userId",checkAuth,adminController.is_admin,adminController.get_user_byId); //get user by id
router.delete("/:adminId/delete_user/:userId",checkAuth,adminController.is_admin,adminController.delete_user); //delete user

//router.get("/completed", adminController.thesis_completed_get_all); // 
 


module.exports = router;
