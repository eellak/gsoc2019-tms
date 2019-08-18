const express = require("express");
const router = express.Router();

const ExternalController = require('../controllers/external');
const checkAuth = require('../middleware/check-auth');


//url: /external

router.post("/signup", ExternalController.user_signup);

router.post("/login", ExternalController.user_login);

router.all("/*",checkAuth);

router.get("/pending/accepted",ExternalController.get_accepted) // get all accepted pending thesis of userId (From different professors) returns from pending collection
router.get("/pending/:pendingId",ExternalController.get_pending_byId); //get pending thesis by id
router.get("/pending/:pendingId/accepted",ExternalController.get_accepted_byId) //get accepted pending thesis by Id
router.post("/pending/:pendingId/accepted",ExternalController.confirm_pending,ExternalController.delete_all_pendings) // thesis is now confirmed for a specific professor

router.get("/pending",ExternalController.get_pending);  //get pending thesis of userId, returns from thesis collection
router.post("/pending",ExternalController.create_pending); //create pending thesis

router.post("/thesis/file/:thesisId",ExternalController.post_pdf) //post pdf of specified pending thesis 
router.put("/thesis/:thesisId",ExternalController.update_thesis) //update specified thesis
router.delete("/file/:thesisId/:fileId",ExternalController.delete_file) //delete specified file
module.exports = router;
