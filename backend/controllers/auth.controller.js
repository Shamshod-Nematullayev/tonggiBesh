import { User } from "../models/User.js";
import generateToken from "../utils/generateToken.js";
import bcrypt from "bcryptjs";

// **Signup (Ro‘yxatdan o‘tish)**
export const signup = async (req, res) => {
  try {
    const { email, password, username } = req.body;

    if (!email || !password || !username) {
      return res.status(400).json({ message: "Please fill all fields" });
    }
    if (password.length < 3) {
      return res
        .status(400)
        .json({ message: "Password must be at least 3 characters long" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({ email, password: hashedPassword, username });
    await user.save();
    // Token yaratish va javob jo‘natish
    generateToken(user._id, res);
    res.status(201).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      profilePicture: user.profilePicture || null,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

// **Login (Kirish)**
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const verified = await bcrypt.compare(password, user.password);
    if (!verified) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Token yaratish va foydalanuvchini qaytarish
    generateToken(user._id, res);
    res.status(200).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      profilePicture: user.profilePicture || null,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

// **Logout (Chiqish)**
export const logout = (req, res) => {
  try {
    res.cookie("jwt", "", { httpOnly: true, expires: new Date(0) });
    res.json({ message: "Logged out successfully" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

// **Get Profile (Profilni olish)**
export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password"); // Parolni yubormaslik uchun
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

