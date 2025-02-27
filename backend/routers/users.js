import { Router } from "express";
import { getUsers, updateProfile } from "../controllers/users.controller.js";
const router = Router();

router.get("/", getUsers);
router.patch("/profile",  updateProfile);


export default router;
