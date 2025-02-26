import express from "express";
import cookieParser from "cookie-parser";
import authRouter from "./routers/auth.js";
import messagesRouter from "./routers/messages.js";
import { config } from "dotenv";

config({ path: "./.env" });
import { server, app } from "./utils/socket.js";

import cors from "cors";
import checkAuth from "./middlewares/checkAuth.js";
import { connectDB } from "./utils/db.js";

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

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => console.log("Server listening port: " + PORT));
