const express = require("express");
const router = express.Router();

const studentController = require('../controllers/student');
const checkAuth = require('../middleware/check-auth');


//URL: /student

router.get("/request",checkAuth,studentController.isUser,studentController.get_request);//get all requests of userId

router.post("/request/:thesisId",checkAuth,studentController.checkUniversity,studentController.apply_thesis);    //check if he is logged in-apply for thesis

router.delete("/request/:requestId",checkAuth,studentController.delete_request);     

//router.get("/completed", studentController.thesis_completed_get_all); //get all completed thesis-digital repository

//router.delete("/:userId", checkAuth, thesisController.user_delete); // 
//search thesis
module.exports = router;
