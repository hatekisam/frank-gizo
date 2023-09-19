const router = require("express").Router();
const handleLogin = require("../../controllers/user/auth/login");
const handleNewUser = require("../../controllers/user/auth/register");
const validate = require("../../middleware/validate");
const { validateUser } = require("../../validators/validator");



router.post("/login", handleLogin);
router.post("/signup", [validate(validateUser)], handleNewUser);

module.exports = router;
