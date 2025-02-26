import jwt from "jsonwebtoken";
import { User } from "../models/User.js";

export default async function checkAuth(req, res, next) {
  try {
    const token = req.cookies.Authorization;
    if (!token) {
      return res.status(401).json({ message: "You are not authenticated" });
    }
    const verified = jwt.verify(token, process.env.JWT_SECRET_KEY);
    if (!verified) {
      return res.status(401).json({ message: "You are not authenticated" });
    }
    const user = await User.findById(verified.userId);
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }
    req.user = user;
    next();
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Internal server error" });
  }
}
