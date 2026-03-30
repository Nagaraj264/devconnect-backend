import prisma from "../services/db.js"



export const createPost = async (req, res, next) => {
  try {
    let imageUrl = null;
    if (req.file && req.file.path) {
      imageUrl = req.file.path; 
    }
    const { title, content, type, tags } = req.body; // Extract 'tags' from body
    const authorId = req.user.id; 
    const post = await prisma.post.create({
      data: { 
        title, 
        content, 
        type, 
        authorId,
        imageUrl,
        // ADD THIS PART TO HANDLE TAGS
        tags: tags ? {
          connectOrCreate: tags.map(tag => ({
            where: { name: tag },
            create: { name: tag }
          }))
        } : undefined
      },
      include: {
        tags: true, // Include tags in the response
        author: { select: { username: true, avatarUrl: true } }
      }
    });
    res.status(201).json(post);
  } catch (error) {
    next(error);
  }
};

export const getPosts = async (req, res, next) => {
  try {
    const { title, tag, type, author, page = 1, limit = 10 } = req.query;
    
    // Calculate how many records to skip
    const skip = (parseInt(page) - 1) * parseInt(limit);
    const where = {
      ...(title && { title: { contains: title, mode: 'insensitive' } }),
      ...(type && { type }),
      ...(author && { author: { username: author } }),
      ...(tag && { tags: { some: { name: tag } } })
    };
    // Use prisma.post.count to get total count for the frontend to know if there's more
    const [posts, total] = await Promise.all([
      prisma.post.findMany({
        where,
        include: {
          author: { select: { name: true, username: true, avatarUrl: true } },
          tags: true,
          _count: { select: { comments: true, likes: true } }
        },
        orderBy: { createdAt: "desc" },
        take: parseInt(limit), // Limit the result
        skip: skip,            // Skip previous pages
      }),
      prisma.post.count({ where })
    ]);
    res.json({
      posts,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    next(error);
  }
};

export const updatePost = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const post = await prisma.post.findUnique({ where: { id } });

    if (!post) return res.status(404).json({ message: "Post not found" });
    if (post.authorId !== userId) return res.status(403).json({ message: "Not authorized" });

    await prisma.post.update({ where: { id }, data: req.body });
    res.json({ message: "Post updated successfully" });
  } catch (error) {
    next(error);
  }
};

export const deletePost = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const post = await prisma.post.findUnique({ where: { id } });

    if (!post) return res.status(404).json({ message: "Post not found" });
    if (post.authorId !== userId) return res.status(403).json({ message: "Not authorized" });

    await prisma.post.delete({ where: { id } });
    res.json({ message: "Post deleted successfully" });
  } catch (error) {
    next(error);
  }
};

