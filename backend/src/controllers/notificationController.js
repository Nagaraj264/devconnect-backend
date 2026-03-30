import prisma from "../services/db.js";

export const getNotifications = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const notifications = await prisma.notification.findMany({
      where: { recipientId: userId },
      include: {
        issuer: {
          select: { id: true, username: true, avatarUrl: true },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    res.json(notifications);
  } catch (error) {
    next(error);
  }
};

export const markAsRead = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    if (id === "all") {
      await prisma.notification.updateMany({
        where: { recipientId: userId, isRead: false },
        data: { isRead: true },
      });
      return res.json({ message: "All notifications marked as read" });
    }

    await prisma.notification.update({
      where: { id },
      data: { isRead: true },
    });

    res.json({ message: "Notification marked as read" });
  } catch (error) {
    next(error);
  }
};
