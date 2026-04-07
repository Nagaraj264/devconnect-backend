import express from "express";
import authRoutes from "./routes/auth.js";
import postRoutes from "./routes/post.js";
import likeRoutes from "./routes/like.js";
import commentRoutes from "./routes/comment.js";
import chatRoutes from "./routes/chat.js";
import userRoutes from "./routes/user.js";
import notificationRoutes from "./routes/notification.js";



import { errorHandler } from "./middleware/error.js";

import cors from "cors";
import helmet from "helmet";



export function createServer() {
    const app = express();

    app.use(helmet());
    app.use(cors({
        origin: process.env.CLIENT_URL || "http://localhost:3000",
        credentials: true
    }));
    
    app.use(express.json());
    app.use('/uploads', express.static('uploads'));

    app.use("/api/auth", authRoutes);
    app.use("/api/posts", postRoutes);
    app.use("/api/likes", likeRoutes);
    app.use("/api/posts/:postId/comments", commentRoutes);
    app.use("/api/users", userRoutes);


    app.use("/api/chat", chatRoutes);

    app.use("/api/notifications", notificationRoutes);
    app.use(errorHandler);

    return app;
}
