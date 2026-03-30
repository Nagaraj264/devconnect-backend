import prisma from "../services/db.js";
import { getIO } from "../sockets/socket.js";

export const toggleLike = async (req, res, next) => {
  try {
    const { id: targetId } = req.params;
    const { type } = req.query;
    const userId = req.user.id;

    const whereClause = type === "post" 
      ? { userId_postId: { userId, postId: targetId } } 
      : { userId_commentId: { userId, commentId: targetId } };

    const existingLike = await prisma.like.findUnique({
      where: whereClause
    });

    if (existingLike) {
      await prisma.like.delete({ where: { id: existingLike.id } });
      return res.status(200).json({ message: "Unliked successfully" });
    }

    await prisma.like.create({
      data: {
        userId,
        postId: type === "post" ? targetId : null,
        commentId: type === "comment" ? targetId : null,
      },
    });

    // --- NOTIFICATION START ---
    try {
      let recipientId;
      if (type === "post") {
        const post = await prisma.post.findUnique({ where: { id: targetId } });
        recipientId = post?.authorId;
      } else {
        const comment = await prisma.comment.findUnique({ where: { id: targetId } });
        recipientId = comment?.authorId;
      }

      if (recipientId && recipientId !== userId) {
        const notification = await prisma.notification.create({
          data: {
            recipientId,
            issuerId: userId,
            type: "POST_LIKE",
            postId: type === "post" ? targetId : null,
            commentId: type === "comment" ? targetId : null,
          },
          include: {
            issuer: { select: { username: true, avatarUrl: true } }
          }
        });

        const io = getIO();
        io.to(recipientId).emit("new_notification", notification);
      }
    } catch (notifError) {
      console.error("Notification failed:", notifError);
      // Don't fail the like request just because notification failed
    }
    // --- NOTIFICATION END ---

    res.status(201).json({ message: "Liked successfully" });
  } catch (error) {
    next(error);
  }
};

