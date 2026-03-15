import express from "express";
import { protect } from "../middleware/auth.js";
import { validate } from "../middleware/validate.js"; 
import { startChatSchema, sendMessageSchema } from "../utils/validators.js"; 
import { 
  startConversation, 
  getConversations, 
  sendMessage, 
  getMessages 
} from "../controllers/chatController.js";

const router = express.Router();

router.use(protect);

router.post("/", validate(startChatSchema), startConversation);

router.get("/", getConversations);

router.post("/:conversationId/messages", validate(sendMessageSchema), sendMessage);

router.get("/:conversationId/messages", getMessages);

export default router;