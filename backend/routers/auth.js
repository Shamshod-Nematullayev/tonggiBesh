import { Router } from "express";
import {
  getProfile,
  login,
  logout,
  signup,
} from "../controllers/auth.controller.js";
import checkAuth from "../middlewares/checkAuth.js";
const router = Router();

router.post("/signup", signup);

router.post("/login", login);

router.get("/logout", logout);

router.get("/profile", checkAuth, getProfile);


export default router;
