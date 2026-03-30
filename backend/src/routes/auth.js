import express from "express";
import { register, login, refreshToken } from "../controllers/authController.js";
import { validate } from "../middleware/validate.js";
import { registerSchema, loginSchema } from "../utils/validators.js";

const router = express.Router();

router.post("/register", validate(registerSchema), register);

router.post("/login", validate(loginSchema), login);

router.post("/refresh", refreshToken);

export default router;
