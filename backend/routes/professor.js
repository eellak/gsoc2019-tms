const express = require("express");
const router = express.Router();
const studentController=require('../controllers/student')
const professorController = require('../controllers/professor');
const checkAuth = require('../middleware/check-auth');

//URL: /professor

router.get("/request",checkAuth,professorController.get_request);//get all requests of userId
router.get("/request:/requestId",checkAuth,professorController.get_request_byId);
router.delete("/request/:requestId",checkAuth,professorController.delete_request);     
router.post("/request/:requestId",checkAuth,professorController.accept_request);

router.get("/assigned",checkAuth,professorController.get_assigned); // get all assigned thesis to students
router.get("/assigned/:assigned_thesisId",checkAuth,professorController.get_assigned_byId);

// this routes are for thesis proposed from externals or students
router.get("/pending",checkAuth,professorController.isProfessor,professorController.get_pending);
router.get("/pending/:pendingId",checkAuth,professorController.get_pending_byId); //pendingId is for thesis
router.post("/pending/:pendingId",checkAuth,professorController.check_pending,professorController.accept_pending);


router.get("/thesis",checkAuth,professorController.get_thesis) // get all thesis he owns
router.get("/thesis/:thesisId",checkAuth,professorController.get_thesis_byId) // get thesis he owns by id
router.post("/thesis",checkAuth,professorController.isProfessor,professorController.create_thesis) // create thesis
router.delete("/thesis/:thesisId",checkAuth,professorController.delete_thesis) //delete thesis he owns


//router.get("/completed", studentController.thesis_completed_get_all); //get all completed thesis-digital repository

//router.delete("/:userId", checkAuth, thesisController.user_delete); // 
//search thesis
module.exports = router;
