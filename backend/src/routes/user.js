import express from "express";
import { protect } from "../middleware/auth.js";
import { validate } from "../middleware/validate.js";
import { updateProfileSchema } from "../utils/validators.js";
import { getUserProfile, updateProfile, searchUsers } from "../controllers/userController.js";
import { uploadAvatar } from "../utils/upload.js"; 
import { parseJsonFields } from "../middleware/parseForm.js";


const router = express.Router();

router.get("/:username", getUserProfile);


router.get("/", searchUsers);

router.put("/me", protect, uploadAvatar.single('avatar'), parseJsonFields(['skills']), validate(updateProfileSchema), updateProfile);


export default router;