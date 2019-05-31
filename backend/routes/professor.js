const express = require("express");
const router = express.Router();
const studentController=require('../controllers/student')
const professorController = require('../controllers/professor');
const checkAuth = require('../middleware/check-auth');


//URL: /professor

router.get("/request",checkAuth,studentController.isUser,professorController.get_request);//get all requests of userId
router.delete("/request/:requestId",checkAuth,studentController.isUser,professorController.delete_request);     

//router.get("/completed", studentController.thesis_completed_get_all); //get all completed thesis-digital repository

//router.delete("/:userId", checkAuth, thesisController.user_delete); // 
//search thesis
module.exports = router;
