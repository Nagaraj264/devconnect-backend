import express from "express";
import authRoutes from "./routes/auth.js";
import postRoutes from "./routes/post.js";
import likeRoutes from "./routes/like.js";
import commentRoutes from "./routes/comment.js";

export function createServer() {
    const app = express();
    
    app.use(express.json());

    app.use("/api/auth", authRoutes);
    app.use("/api/posts", postRoutes);
    app.use("/api/likes", likeRoutes);
    app.use("/api/posts/:postId/comments", commentRoutes);

    return app;
}
