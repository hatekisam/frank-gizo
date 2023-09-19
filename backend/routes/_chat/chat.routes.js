const { chat } = require("../../controllers/chat/chat.controller");

const router = require("express").Router();

router.post("/", chat);

module.exports = router;
