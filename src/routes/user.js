import express from "express";
import { protect } from "../middleware/auth.js";
import { validate } from "../middleware/validate.js";
import { updateProfileSchema } from "../utils/validators.js";
import { getUserProfile, updateProfile } from "../controllers/userController.js";
import { uploadAvatar } from "../utils/upload.js"; 

const router = express.Router();

router.get("/:username", getUserProfile);

router.put("/me", protect, uploadAvatar.single('avatar'), validate(updateProfileSchema), updateProfile);

export default router;