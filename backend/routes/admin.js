const express = require("express");
const router = express.Router();

const adminController = require('../controllers/admin');
const checkAuth = require('../middleware/check-auth');
const externalController= require('../controllers/external')

//URL: /admin

router.get("/",checkAuth,adminController.is_admin2); //check if user is admin

router.all("/*",checkAuth,adminController.is_admin); // check if user is admin. For all routes

router.post("/create_external",externalController.user_signup); //create external
router.get("/get_externals",adminController.get_externals); //get all externals
router.get("/get_external/:userId",adminController.get_external_byId); //get external by id
router.delete("/delete_external/:userId",adminController.delete_external); //delete external
router.get("/get_not_active_externals",adminController.get_not_active_externals); //get all not active externals;
router.get("/activate_external/:userId",adminController.activate_external); //activate external with the specified id;
router.put("/update_external/:userId",adminController.update_external); //update external

router.get("/get_users",adminController.get_users); //get all users
router.get("/get_user/:userId",adminController.get_user_byId); //get user by id
router.delete("/delete_user/:userId",adminController.delete_user); //delete user
router.put("/update_user/:userId",adminController.update_user); //update user

router.post("/application_period",adminController.application_period); // specify application period
 
router.post("/create_university",adminController.create_university) // create university
router.delete("/delete_university/:universityId",adminController.delete_university) //delete university

//router.get("/completed", adminController.thesis_completed_get_all); // 
 


module.exports = router;
