import express from "express";
import { createComment, getCommentsByPost, deleteComment } from "../controllers/commentController.js";
import { protect } from "../middleware/auth.js";
import { validate } from "../middleware/validate.js";
import { createCommentSchema } from "../utils/validators.js";

const router = express.Router({ mergeParams: true });

router.get("/", getCommentsByPost);

router.post("/", protect, validate(createCommentSchema), createComment);

router.delete("/:id", protect, deleteComment);

export default router;
