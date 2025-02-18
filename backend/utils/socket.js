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
  console.log("New client connected");
  console.log(socket.handshake.query.userId);
  console.log("🔗 Yangi mijoz ulandi:", socket.id);

  socket.on("disconnect", () => {
    console.log("🔌 Mijoz uzildi:", socket.id);
  });
})

export { io, app, server };
