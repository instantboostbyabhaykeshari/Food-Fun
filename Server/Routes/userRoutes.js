const express = require("express");
const router = express.Router();

const {sendOTP, signUp} = require("../Controllers/auth.js");

router.post("/sendOtp", sendOTP);
router.post("/signUp", signUp);


// router.post("/deleteUser", logout);

module.exports = router;
