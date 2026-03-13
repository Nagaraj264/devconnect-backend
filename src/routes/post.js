import express from "express";
import { createPost, getPosts, deletePost, updatePost } from "../controllers/postController.js";
import { protect } from "../middleware/auth.js";
import { validate } from "../middleware/validate.js";
import { createPostSchema, updatePostSchema } from "../utils/validators.js";

const router = express.Router();

router.get("/", getPosts);

router.post("/", protect, validate(createPostSchema), createPost);
router.put("/:id", protect, validate(updatePostSchema), updatePost);
router.delete("/:id", protect, deletePost);

export default router;
