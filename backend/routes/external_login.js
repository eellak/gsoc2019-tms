const express = require("express");
const router = express.Router();

const ExternalController = require('../controllers/external_login');
const checkAuth = require('../middleware/check-auth');


//url: /external
router.post("/signup", ExternalController.user_signup);

router.post("/login", ExternalController.user_login);


module.exports = router;
