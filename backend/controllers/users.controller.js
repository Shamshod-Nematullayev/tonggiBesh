import { User } from "../models/User.js";
import uploadImage from "../utils/cloudinary.js";

export const getUsers = async (req, res) => {
  try {
    const users = await User.find({}).select("-email");
    res.status(200).json(users);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server error" });
  }
};

// **Update Profile (Profilni yangilash)**
export const updateProfile = async (req, res) => {
  try {
    const { profilePic } = req.body;

    const user = await User.findByIdAndUpdate(
      req.user.id,
      { $set: { profilePicture: (await uploadImage(profilePic)).secure_url } },
      { new: true }
    ).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};
