const express = require("express");
const router = express.Router();
const {register,login, updateUserImg, updateUserName} = require("../router_handler/user")

router.post("/register",register);
router.post("/login",login);
router.post("/updateUserImg",updateUserImg);
router.post("/updateUserName",updateUserName)

module.exports = router;