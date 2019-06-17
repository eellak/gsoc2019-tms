const express = require("express");
const router = express.Router();
const secretariatController=require('../controllers/student')
const professorController = require('../controllers/professor');
const checkAuth = require('../middleware/check-auth');


//url secretariat 

router.get("/notify_student/:studentId",checkAuth,secretariatController.is_secretariat,secretariatController.notify_student);