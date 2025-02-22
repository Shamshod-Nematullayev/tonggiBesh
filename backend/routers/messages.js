import { Router } from "express";
import checkAuth from "../middlewares/checkAuth.js";
import {
  deleteMessage,
  getChatMessages,
  sendMessage,
  updateMessageText,
} from "../controllers/messages.controller.js";

const router = Router();

router.get("/:chatId", getChatMessages);

router.post("/:chatId", sendMessage);

// futures
// router.put("/:messageId", checkAuth, updateMessageText);

// router.delete("/:messageId", checkAuth, deleteMessage);

export default router;
