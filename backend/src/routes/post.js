import express from "express";
import { createPost, getPosts, deletePost, updatePost, getPostById } from "../controllers/postController.js";
import { protect } from "../middleware/auth.js";
import { validate } from "../middleware/validate.js";
import { createPostSchema, updatePostSchema } from "../utils/validators.js";
import { uploadPostImage } from "../utils/upload.js";

const router = express.Router();

router.get("/", protect, getPosts);

router.get("/:id", protect, getPostById);

router.post("/", protect, uploadPostImage.single('image'), validate(createPostSchema), createPost);
router.put("/:id", protect, validate(updatePostSchema), updatePost);
router.delete("/:id", protect, deletePost);

export default router;
