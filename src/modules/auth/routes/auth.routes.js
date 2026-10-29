import { Router } from "express";
import authController from "../controllers/auth.controller.js";
import { registerSchema, loginSchema, validate } from "../validators/auth.validator.js";

const router = Router();

router.post("/register", validate(registerSchema), authController.register.bind(authController));
router.post("/login",    validate(loginSchema),    authController.login.bind(authController));

export default router;
