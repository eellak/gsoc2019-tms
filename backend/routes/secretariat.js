const express = require("express");
const router = express.Router();
const secretariatController=require('../controllers/secretariat')
const professorController = require('../controllers/professor');
const checkAuth = require('../middleware/check-auth');


//url secretariat 

router.post("/notify_student/:studentId",checkAuth,secretariatController.is_secretariat
                                        ,secretariatController.notify_student);













module.exports = router;
