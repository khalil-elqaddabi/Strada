const { Router } = require("express");
const { register }                  = require("../controllers/auth.controller");
const { registerSchema, validate }  = require("../validators/auth.validator");

const router = Router();

router.post("/register", validate(registerSchema), register);

module.exports = router;
