const express = require("express");
const router = express.Router();
const {getStoryBykeyWord,getStoryList, addStory} = require("../router_handler/story");

router.get("/getStoryBykeyWord/:keyWord",getStoryBykeyWord);
router.get("/getStoryList/:pages/:limit",getStoryList);
router.post("/addStory",addStory);


module.exports = router;