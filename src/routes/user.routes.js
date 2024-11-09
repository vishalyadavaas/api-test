const express = require("express");
const router = express.Router();

const { registration, login } = require("../controllers/user.controller");

router.post("/signup", registration);
router.post("/login", login);


module.exports = router;