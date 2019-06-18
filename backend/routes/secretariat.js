const express = require("express");
const router = express.Router();
const secretariatController=require('../controllers/secretariat')
const professorController = require('../controllers/professor');
const checkAuth = require('../middleware/check-auth');


//url secretariat 


router.get("/get_students",checkAuth,secretariatController.is_secretariat,secretariatController.get_students_not_assigned) //get students that have not assigned  a thesis


router.post("/notify_student/:studentId",checkAuth,secretariatController.is_secretariat
                                        ,secretariatController.notify_student);  //notify students that dont have assigned a thesis













module.exports = router;
