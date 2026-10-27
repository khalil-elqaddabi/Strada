const { Router } = require("express");
const { register, login } = require("../controllers/auth.controller");
const { registerSchema, validate, loginSchema } = require("../validators/auth.validator");

const router = Router();

router.post("/register", validate(registerSchema), register);
router.post("/login", validate(loginSchema), login);

module.exports = router;
