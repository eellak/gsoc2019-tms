
const express = require("express");
const router = express.Router();
const studentController = require('../controllers/student');
const checkAuth = require('../middleware/check-auth');

//URL: /student

router.all("/*",checkAuth,studentController.is_student);   //verify token, check if user is student

router.get("/check/:thesisId",studentController.checkRequest);//check if student has applied in a specific thesis

router.get("/request",studentController.get_request);//get all requests of userId
router.post("/request/:thesisId",studentController.checkApplication_period,studentController.checkUniversity,studentController.check_assigned_thesis,studentController.apply_thesis);    //check if he is logged in-apply for thesis
router.delete("/request/:requestId",studentController.delete_request);    //delete specified request   

router.get("/check_assigned",studentController.check_assigned_thesis,studentController.endrequest); //check if student has assigned to a thesis

router.get("/request/accepted",studentController.get_accepted_request); // get all accepted requests from professors
router.get("/request/:requestId/accepted",studentController.get_accepted_request_byId); // get accepted request by Id
router.post("/request/:requestId/accepted",studentController.post_accepted_request,studentController.delete_all_requests);// confirm request, establish connection(Student,Professor,Thesis) , remove requests of student


router.get("/pending/accepted",studentController.get_accepted_pending) // get all accepted pending thesis of userId (From different professors) returns from pending collection
router.get("/pending/:pendingId/accepted",studentController.get_accepted_pending_byId) //get accepted pending thesis by Id
router.post("/pending/:pendingId/accepted",studentController.confirm_pending,studentController.delete_all_pendings) // thesis is now confirmed for a specific professor

router.get("/pending",studentController.get_pending);  //get pending thesis of userId returns from thesis collection
router.get("/pending/:thesisId",studentController.get_pending_byId); //get pending thesis by id
router.post("/pending",studentController.create_pending); //create pending thesis
router.delete("/pending/:thesisId",studentController.delete_pending) //delete pending thesis

router.get("/thesis",studentController.get_thesis); //get thesis student
router.post("/completed/:assigned_thesisId",studentController.post_completed_file)  // post completed thesis file
router.get("/completed/:assigned_thesisId",studentController.get_completed_file)    //get completed thesis file

router.get("/draft/:assigned_thesisId",studentController.check_thesis,studentController.get_drafts); //get drafts of thesis
router.get("/draft/:assigned_thesisId/:draftId",studentController.check_thesis,studentController.get_draft_byId); //get draft by id of thesis
router.post("/draft/:assigned_thesisId",studentController.check_thesis,studentController.post_draft); //create draft 

router.get("/notification",studentController.get_notifications); //get all notifications

//router.delete("/:userId", checkAuth, thesisController.user_delete); // 
//search thesis
module.exports = router;
