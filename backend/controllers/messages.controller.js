import { Message } from "../models/Message.js";
import uploadImage from "../utils/cloudinary.js";
import { io, userSocketMap } from "../utils/socket.js";

export const getChatMessages = async (req, res) => {
  try {
    const messages = await Message.find({
      receiverId: req.params.chatId,
      senderId: req.user._id,
    }).sort({ createdAt: 1 });
    res.status(200).json(messages);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server error" });
  }
};

export const sendMessage = async (req, res) => {
  try {
    const message = await Message.create({
      text: req.body.text,
      senderId: req.user._id,
      receiverId: req.params.chatId,
      image: (await uploadImage(req.body.image)).secure_url,
    });

    if (userSocketMap[message.receiverId]) {
      io.to(userSocketMap[message.receiverId]).emit("newMessage", message);
    }
    res.status(201).json(message);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server error" });
  }
};

export const updateMessageText = async (req, res) => {
  try {
    const message = await Message.findByIdAndUpdate(
      req.params.messageId,
      { $set: { text: req.body.text } },
      {
        new: true,
      }
    );
    if (!message) {
      return res.status(404).json({ message: "Message not found" });
    }
    res.status(200).json(message);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteMessage = async (req, res) => {
  try {
    const message = await Message.findByIdAndDelete(req.params.messageId);
    if (!message) {
      return res.status(404).json({ message: "Message not found" });
    }
    res.status(200).json({ message: "Message deleted successfully" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server error" });
  }
};
