const express = require("express");
const router = express.Router();

const thesisController = require('../controllers/thesis');
const checkAuth = require('../middleware/check-auth');


//URL: /thesis

router.get("/", thesisController.thesis_get_all);    //get all thesis  //queries url: page,university

router.get("/files/:thesisId",thesisController.get_files) //get files of specified thesis
router.get("/file/:fileId",thesisController.get_file_byId) // get specified file 
router.get("/completed", thesisController.thesis_completed_get_all); //get all completed thesis-digital repository

router.get("/:thesisId",thesisController.get_byId)  //get by id



//router.delete("/:userId", checkAuth, thesisController.user_delete); // 
//search thesis
module.exports = router;
