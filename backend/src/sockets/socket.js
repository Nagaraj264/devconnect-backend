import { Server } from "socket.io";

let io;

export const initSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: process.env.CLIENT_URL || "*", 
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log("A user connected:", socket.id);

    socket.on("join_conversation", (conversationId) => {
      socket.join(conversationId);
      console.log(`User ${socket.id} joined room ${conversationId}`);
    });

    socket.on("join_user_room", (userId) => {
      socket.join(userId);
      console.log(`User ${socket.id} joined personal room ${userId}`);
    });

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
    });
  });

  return io;
};

export const getIO = () => {
  if (!io) {
    throw new Error("Socket.io not initialized!");
  }
  return io;
};