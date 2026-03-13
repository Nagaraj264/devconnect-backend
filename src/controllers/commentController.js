import prisma from "../services/db.js";

export const createComment = async (req, res, next) => {
  try {
    const { content } = req.body;
    const { postId } = req.params;
    const userId = req.user.id;

    const post = await prisma.post.findUnique({ where: { id: postId } });
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    const comment = await prisma.comment.create({
      data: {
        content,
        postId,
        authorId: userId,
      },
      include: {
        author: {
          select: { name: true, username: true, avatarUrl: true },
        },
      },
    });

    res.status(201).json(comment);
  } catch (error) {
    next(error);
  }
};

export const getCommentsByPost = async (req, res, next) => {
  try {
    const { postId } = req.params;

    const comments = await prisma.comment.findMany({
      where: { postId },
      include: {
        author: {
          select: { name: true, username: true, avatarUrl: true },
        },
        _count: {
          select: { likes: true },
        },
      },
      orderBy: { createdAt: "asc" }, 
    });

    res.json(comments);
  } catch (error) {
    next(error);
  }
};

export const deleteComment = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const comment = await prisma.comment.findUnique({ where: { id } });

    if (!comment) return res.status(404).json({ message: "Comment not found" });
    
    if (comment.authorId !== userId) {
      return res.status(403).json({ message: "Not authorized to delete this comment" });
    }

    await prisma.comment.delete({ where: { id } });
    res.json({ message: "Comment deleted successfully" });
  } catch (error) {
    next(error);
  }
};
