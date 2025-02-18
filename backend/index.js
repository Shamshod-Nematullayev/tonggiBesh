import cookieParser from "cookie-parser";
import express from "express";
import authRouter from "./routers/auth.js";
import messagesRouter from "./routers/messages.js";
import { server, app } from "./utils/socket.js";
import cors from 'cors'

app.use(express.json());
app.use(cookieParser());
app.use(cors())

app.use("/api/auth", authRouter);
app.use("/api/messages", messagesRouter);

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => console.log("Server listening port: " + PORT));
