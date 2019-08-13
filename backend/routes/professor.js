const express = require("express");
const router = express.Router();
const professorController = require('../controllers/professor');
const checkAuth = require('../middleware/check-auth');

//URL: /professor

router.all("/*",checkAuth,professorController.isProfessor); //verify token, check if user is professor



router.get("/request",professorController.get_request);//get all requests of userId
router.get("/request:/requestId",professorController.get_request_byId);
router.delete("/request/:requestId",professorController.delete_request);     
router.post("/request/:requestId",professorController.accept_request);

router.get("/assigned",professorController.get_assigned); // get all assigned thesis to students
router.get("/assigned/:assigned_thesisId",professorController.get_assigned_byId);

// this routes are for thesis proposed from externals or students
router.get("/pending",professorController.get_pending);
router.get("/pending/:pendingId",professorController.get_pending_byId); //pendingId is for thesis
router.get("/pending/check/:pendingId",professorController.check_pending2); // check if professor has already applied
router.post("/pending/:pendingId",professorController.check_pending,professorController.accept_pending);


router.get("/thesis",professorController.get_thesis) // get all thesis he owns
router.get("/thesis/:thesisId",professorController.get_thesis_byId) // get thesis he owns by id
router.post("/thesis",professorController.create_thesis) // create thesis
router.put("/thesis/:thesisId",professorController.update_thesis) //update current thesis
router.delete("/thesis/:thesisId",professorController.delete_thesis) //delete thesis he owns


router.get("/university",professorController.get_professors) // get all professors from the same university

// routes for professor to be supervisor
router.get("/supervise_pending",professorController.get_supervise_pending) //get the supervise request from other professors to userId 
router.get("/supervise_pending/:supervise_requestId",professorController.get_supervise_pending_byId) //get the supervise request from other professors to userId 
router.post("/supervise_pending/:supervise_requestId",professorController.post_supervise_pending) // accept request for supervision

// get drafts

router.get("/draft/:assigned_thesisId",professorController.check_thesis,professorController.get_drafts); //get drafts of thesis
router.get("/draft/:assigned_thesisId/:draftId",professorController.check_thesis,professorController.get_draft_byId); //get draft by id of thesis

//routes for professor to propose another supervisor
router.post("/propose_supervisor/:supervisorId/:thesisId",professorController.check_supervisor_request,professorController.propose_supervisor) //propose another professor to supervise a thesis
router.get("/accept_supervisor",professorController.get_accepted_supervisor_requests) // get accepted supervisors before confirm
router.get("/accept_supervisor/:supervise_requestId",professorController.get_accepted_supervisor_request_byId) // get accepted supervisors before confirm
router.post("/accept_supervisor/:supervise_requestId",professorController.accept_supervisor,professorController.delete_supervisor_request) // professor confirms the supervisor

//router.get()

 


//router.delete("/:userId", checkAuth, thesisController.user_delete); // 
//search thesis
module.exports = router;
