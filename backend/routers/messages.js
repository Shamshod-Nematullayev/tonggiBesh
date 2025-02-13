import { Router } from "express";
import checkAuth from "../middlewares/checkAuth";
import {
  deleteMessage,
  getChatMessages,
  sendMessage,
  updateMessageText,
} from "../controllers/messages.controller";

const router = Router();

router.get("/:chatId", checkAuth, getChatMessages);

router.post("/:chatId", checkAuth, sendMessage);

router.put("/:messageId", checkAuth, updateMessageText);

router.delete("/:messageId", checkAuth, deleteMessage);

export default router;
