import prisma from "../services/db.js";

// Get user profile by username
export const getUserProfile = async (req, res, next) => {
  try {
    const { username } = req.params;

    const user = await prisma.user.findUnique({
      where: { username },
      select: {
        id: true,
        username: true,
        name: true,
        bio: true,
        avatarUrl: true,
        githubUrl: true,
        twitterUrl: true,
        skills: true,
        createdAt: true,
        _count: { select: { posts: true, comments: true } }
      },
    });

    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (error) {
    next(error);
  }
};

export const updateProfile = async (req, res, next) => {
  try {
    const userId = req.user.id;
    
    if (req.file && req.file.path) {
      req.body.avatarUrl = req.file.path; 
    }

    const { name, bio, githubUrl, twitterUrl, skills, avatarUrl } = req.body;

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        ...(name !== undefined && { name }),
        ...(bio !== undefined && { bio }),
        ...(githubUrl !== undefined && { githubUrl }),
        ...(twitterUrl !== undefined && { twitterUrl }),
        ...(skills !== undefined && { skills }),
        ...(avatarUrl !== undefined && { avatarUrl }),
      },
      select: {
        id: true,
        username: true,
        name: true,
        bio: true,
        avatarUrl: true,
        githubUrl: true,
        twitterUrl: true,
        skills: true,
      },
    });

    res.json({ message: "Profile updated successfully", user: updatedUser });
  } catch (error) {
    next(error);
  }
};