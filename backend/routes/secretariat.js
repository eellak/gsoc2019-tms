const express = require("express");
const router = express.Router();
const secretariatController=require('../controllers/secretariat')
const professorController = require('../controllers/professor');
const checkAuth = require('../middleware/check-auth');


//url secretariat 

router.all("/*",checkAuth,secretariatController.is_secretariat)


router.get("/get_students",secretariatController.get_students_pages); //get all students
router.get("/get_students_not_assigned",secretariatController.get_students) //get students seperated in assigned and not assigned to thesis

router.get("/get_professors",secretariatController.get_professors) // get all professors

router.post("/notify_student/:studentId",secretariatController.notify_student);  //notify students that dont have assigned a thesis













module.exports = router;
