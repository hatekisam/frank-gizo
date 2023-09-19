const { contactUs } = require('../../controllers/contact/contact.controller');

const router = require('express').Router();


router.post("/", contactUs);

module.exports = router;