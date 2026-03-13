import prisma from "../services/db.js";

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

    res.status(201).json({ message: "Liked successfully" });
  } catch (error) {
    next(error);
  }
};

