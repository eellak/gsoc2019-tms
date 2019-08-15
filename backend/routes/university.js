const express = require("express");
const router = express.Router();

const universityController = require('../controllers/university');
const checkAuth = require('../middleware/check-auth');


//URL: /university

router.get("/", universityController.get_all);    //get all universities with pagination
router.get("/noPages",universityController.get_all_noPages) //get all , no pagination
router.get("/:universityId", universityController.get_byId) //get university by id

//router.delete("/:userId", checkAuth, thesisController.user_delete); // 
//search thesis
module.exports = router;
