const express = require("express");
const { has } = require("lodash");
const router = express.Router();
const {hasLove, addLove, removeLove,getLoveList} = require("../router_handler/love")

router.post("/hasLove",hasLove);
router.post("/addLove",addLove);
router.post("/removeLove",removeLove);
router.get("/getLoveList/:userId",getLoveList);

module.exports = router;