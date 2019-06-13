const express = require("express");
const router = express.Router();

const universityController = require('../controllers/university');
const checkAuth = require('../middleware/check-auth');


//URL: /thesis

router.get("/", universityController.get_all);    //get all universities
router.get("/:universityId", universityController.get_byId) //get university by id


//router.delete("/:userId", checkAuth, thesisController.user_delete); // 
//search thesis
module.exports = router;
