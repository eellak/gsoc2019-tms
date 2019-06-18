const express = require("express");
const router = express.Router();
const secretariatController=require('../controllers/student')
const professorController = require('../controllers/professor');
const checkAuth = require('../middleware/check-auth');
const notificationController=require('../controllers/notification');

//url notification 

router.get('/get_all',checkAuth,notificationController.get_all);










module.exports = router;
