
const express = require("express");
const router = express.Router();

const studentController = require('../controllers/student');
const checkAuth = require('../middleware/check-auth');

//URL: /student


router.get("/request",checkAuth,studentController.get_request);//get all requests of userId
router.post("/request/:thesisId",checkAuth,studentController.checkApplication_period,studentController.checkUniversity,studentController.apply_thesis);    //check if he is logged in-apply for thesis
router.delete("/request/:requestId",checkAuth,studentController.delete_request);     


router.get("/request/accepted",checkAuth,studentController.get_accepted_request); // get all accepted requests from professors
router.get("/request/:requestId/accepted",checkAuth,studentController.get_accepted_request_byId); // get accepted request by Id
router.post("/request/:requestId/accepted",checkAuth,studentController.post_accepted_request,studentController.delete_all_requests);// confirm request, establish connection(Student,Professor,Thesis) , remove requests of student


router.get("/pending/accepted",checkAuth,studentController.get_accepted_pending) // get all accepted pending thesis of userId (From different professors) returns from pending collection
router.get("/pending/:pendingId/accepted",checkAuth,studentController.get_accepted_pending_byId) //get accepted pending thesis by Id
router.post("/pending/:pendingId/accepted",checkAuth,studentController.confirm_pending,studentController.delete_all_pendings) // thesis is now confirmed for a specific professor

router.get("/pending",checkAuth,studentController.get_pending);  //get pending thesis of userId returns from thesis collection
router.get("/pending/:pendingId",checkAuth,studentController.get_pending_byId); //get pending thesis by id
router.post("/pending",checkAuth,studentController.create_pending); //create pending thesis

router.get("/thesis",checkAuth,studentController.get_thesis); //get thesis student

router.get("/draft/:assigned_thesisId",checkAuth,studentController.check_thesis,studentController.get_drafts); //get drafts of thesis
router.get("/draft/:assigned_thesisId/:draftId",checkAuth,studentController.check_thesis,studentController.get_draft_byId); //get draft by id of thesis
router.post("/draft/:assigned_thesisId",checkAuth,studentController.check_thesis,studentController.post_draft); //create draft 

//router.get("/completed", studentController.thesis_completed_get_all); //get all completed thesis-digital repository

//router.delete("/:userId", checkAuth, thesisController.user_delete); // 
//search thesis
module.exports = router;
