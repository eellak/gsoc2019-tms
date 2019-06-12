const express = require("express");
const router = express.Router();

const thesisController = require('../controllers/thesis');
const checkAuth = require('../middleware/check-auth');


//URL: /thesis

router.get("/", thesisController.thesis_get_all);    //get all thesis  //queries url: page,university
router.get("/:thesisId",thesisController.get_byId)  //get by id

router.get("/completed", thesisController.thesis_completed_get_all); //get all completed thesis-digital repository

//router.delete("/:userId", checkAuth, thesisController.user_delete); // 
//search thesis
module.exports = router;
