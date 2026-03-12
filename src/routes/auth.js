import express from "express";
import { register } from "../controllers/authController.js";
import { validate } from "../middleware/validate.js";
import { registerSchema } from "../utils/validators.js";

const router = express.Router();

router.post("/register", validate(registerSchema), register);

export default router;
