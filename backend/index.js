import cookieParser from "cookie-parser";
import express from "express";
import authRouter from "./routers/auth";
import messagesRouter from "./routers/messages";
import { app } from "./utils/socket";

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRouter);
app.use("/api/messages", messagesRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("Server listening port: " + PORT));
