import path from 'path'
import express from "express";
import cookieParser from "cookie-parser";
import authRouter from "./routers/auth.js";
import messagesRouter from "./routers/messages.js";
import usersRouter from "./routers/users.js";
import { config } from "dotenv";

config({ path: "./.env" });
import { server, app } from "./utils/socket.js";

import cors from "cors";
import checkAuth from "./middlewares/checkAuth.js";
import { connectDB } from "./utils/db.js";

const __dirname = path.resolve();

(async () => {
  await connectDB();
})();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use("/api/auth", authRouter);
app.use("/api/messages", checkAuth, messagesRouter);
app.use("/api/users", checkAuth, usersRouter);
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => console.log("Server listening port: " + PORT));
