import { z } from "zod";

export const registerSchema = z.object({
  email: z.string().email("Invalid email address"),
  username: z.string().min(3, "Username must be at least 3 characters"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  name: z.string().min(3, "Name is required"),
});



export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1, "Password is required"),
});



export const createPostSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  content: z.string().min(10, "Content must be at least 10 characters"),
  type: z.enum(["QUESTION", "RESOURCE", "DISCUSSION"]).optional(),
});


export const updatePostSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters").optional(),
  content: z.string().min(10, "Content must be at least 10 characters").optional(),
  type: z.enum(["QUESTION", "RESOURCE", "DISCUSSION"]).optional(),
});



export const createCommentSchema = z.object({
  content: z.string().min(1, "Comment cannot be empty").max(500, "Comment too long"),
});
