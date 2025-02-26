import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    credentials: true
  },
});

const userSocketMap = {}; 

io.on("connection", (socket) => {
  const token = socket.handshake.auth?.token || socket.handshake.query?.token;

  if (!token) {
    console.log("Token yo‘q, ulanish rad etildi!");
    return socket.disconnect(true);
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY); // Tokenni dekod qilish
    const userId = decoded.userId; // Foydalanuvchi ID si token ichidan olinadi

    // userId bilan socketni bog‘lash
    userSocketMap[userId] = socket.id;

    io.emit("onlineUsers", Object.keys(userSocketMap)); // Onlayn userlarni yangilash

    socket.on("disconnect", () => {
      delete userSocketMap[userId];
      io.emit("onlineUsers", Object.keys(userSocketMap));
    });
  } catch (err) {
    console.log("Noto‘g‘ri token, ulanish rad etildi!");
    return socket.disconnect(true);
  }
});


export { io, app, server, userSocketMap };
