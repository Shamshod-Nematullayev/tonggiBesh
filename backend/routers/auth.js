import { Router } from "express";
import {
  getProfile,
  login,
  logout,
  signup,
  updateProfile,
} from "../controllers/auth.controller.js";
import checkAuth from "../middlewares/checkAuth.js";
const router = Router();

router.post("/signup", signup);

router.post("/login", login);

router.get("/logout", logout);

router.get("/profile", checkAuth, getProfile);

router.patch("/profile", checkAuth, updateProfile);

export default router;
