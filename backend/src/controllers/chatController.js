import prisma from "../services/db.js";
import { getIO } from "../sockets/socket.js";

export const startConversation = async (req, res, next) => {
  try {
    const { recipientId } = req.body;
    const userId = req.user.id;

    const existingConversation = await prisma.conversation.findFirst({
      where: {
        isGroup: false,
        AND: [
          { participants: { some: { userId } } },
          { participants: { some: { userId: recipientId } } },
        ],
      },
      include: {
        participants: {
          include: {
            user: { select: { id: true, username: true, avatarUrl: true } },
          },
        },
      },
    });

    if (existingConversation) {
      return res.json(existingConversation);
    }

    const conversation = await prisma.conversation.create({
      data: {
        isGroup: false,
        participants: {
          create: [
            { userId },
            { userId: recipientId }
          ]
        }
      },
      include: {
        participants: {
          include: {
            user: { select: { id: true, username: true, avatarUrl: true } },
          },
        },
      },
    });

    res.status(201).json(conversation);
  } catch (error) {
    next(error);
  }
};

export const getConversations = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const conversations = await prisma.conversation.findMany({
      where: {
        participants: { some: { userId } },
      },
      include: {
        participants: {
          include: {
            user: { select: { id: true, username: true, avatarUrl: true } },
          },
        },
        messages: {
          take: 1,
          orderBy: { createdAt: "desc" }, 
        },
      },
      orderBy: { updatedAt: "desc" },
    });

    res.json(conversations);
  } catch (error) {
    next(error);
  }
};

export const sendMessage = async (req, res, next) => {
  try {
    const { conversationId } = req.params;
    const { content } = req.body;
    const senderId = req.user.id;
    const message = await prisma.message.create({
      data: {
        content,
        senderId,
        conversationId,
      },
      include: {
        sender: { select: { id: true, username: true, avatarUrl: true } },
      },
    });
    await prisma.conversation.update({
      where: { id: conversationId },
      data: { 
        lastMessageAt: new Date(),
        updatedAt: new Date()
      },
    });
    const io = getIO();
    io.to(conversationId).emit("new_message", message);
    try {
      const conversation = await prisma.conversation.findUnique({
        where: { id: conversationId },
        include: { participants: true },
      });
      const otherParticipants = conversation.participants.filter(
        (p) => p.userId !== senderId
      );
      await Promise.all(
        otherParticipants.map((participant) =>
          prisma.notification.create({
            data: {
              recipientId: participant.userId,
              issuerId: senderId,
              type: "NEW_MESSAGE",
              messageId: message.id,
            },
          })
        )
      );
    } catch (notifError) {
      console.error("Chat notification failed to save:", notifError);
    }
    res.status(201).json(message);
  } catch (error) {
    next(error);
  }
};

export const getMessages = async (req, res, next) => {
  try {
    const { conversationId } = req.params;
    const { page = 1, limit = 20 } = req.query; // Default to 20 messages per page
    const skip = (parseInt(page) - 1) * parseInt(limit);
    const [messages, total] = await Promise.all([
      prisma.message.findMany({
        where: { conversationId },
        include: {
          sender: { select: { id: true, username: true, avatarUrl: true } },
        },
        orderBy: { createdAt: "desc" }, // Order by newest first for pagination
        take: parseInt(limit),
        skip: skip,
      }),
      prisma.message.count({ where: { conversationId } })
    ]);
    // Reverse to show oldest first in UI
    res.json({
        messages: messages.reverse(),
        pagination: { total, page, limit }
    });
  } catch (error) {
    next(error);
  }
};


export const createGroup = async (req, res, next) => {
  try {
    const { name, participantIds } = req.body; // Expecting a name and array of IDs
    const userId = req.user.id;
    // Ensure the creator is also a participant
    const allParticipants = [...new Set([...participantIds, userId])];
    const group = await prisma.conversation.create({
      data: {
        isGroup: true,
        name,
        participants: {
          create: allParticipants.map(id => ({ userId: id }))
        }
      },
      include: {
        participants: {
          include: {
            user: { select: { id: true, username: true, avatarUrl: true } },
          },
        },
      },
    });
    res.status(201).json(group);
  } catch (error) {
    next(error);
  }
};