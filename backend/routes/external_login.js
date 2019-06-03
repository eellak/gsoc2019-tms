const express = require("express");
const router = express.Router();

const ExternalController = require('../controllers/external_login');
const checkAuth = require('../middleware/check-auth');


//url: /external
router.post("/signup", ExternalController.user_signup);

router.post("/login", ExternalController.user_login);

router.get("/pending/accepted",checkAuth,ExternalController.get_accepted) // get all accepted pending thesis of userId (From different professors) returns from pending collection
router.get("/pending/:pendingId/accepted",checkAuth,ExternalController.get_accepted_byId) //get accepted pending thesis by Id
router.post("/pending/:pendingId/accepted",checkAuth,ExternalController.confirm_pending,ExternalController.delete_all_pendings) // thesis is now confirmed for a specific professor

router.get("/pending",checkAuth,ExternalController.get_pending);  //get pending thesis of userId returns from thesis collection
router.get("/pending/:pendingId",checkAuth,ExternalController.get_pending_byId); //get pending thesis by id
router.post("/pending",checkAuth,ExternalController.create_pending); //create pending thesis


module.exports = router;
