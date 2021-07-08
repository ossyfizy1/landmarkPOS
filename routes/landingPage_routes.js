const express = require('express');
var router = express.Router();

var landingPage_controller = require("../controller/landingPage_controller");
var authenticateUser = require("../middleware");
 

/* landingPage routes */

// index route
router.get('/', landingPage_controller.index);

// general login route
router.post('/general_login', landingPage_controller.general_login);

// scanner
router.get('/scanner', authenticateUser, landingPage_controller.scanner);

// name_verification
router.get('/name_verification', authenticateUser, landingPage_controller.name_verification);

// logout get route
router.get('/logout', landingPage_controller.logout);




module.exports = router;