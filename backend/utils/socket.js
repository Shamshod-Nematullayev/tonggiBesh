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

io.on("connection", socket => {
  userSocketMap[socket.handshake.query.userId] = socket.id
  io.emit("onlineUsers", userSocketMap)
  socket.on("disconnect", () => {
    delete userSocketMap[socket.id]
  });
})

export { io, app, server, userSocketMap };
