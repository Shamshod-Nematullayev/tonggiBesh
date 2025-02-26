import { Schema, model } from "mongoose";
const schema = new Schema({
  username: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 30,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  profilePicture: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const User = model("user", schema);
