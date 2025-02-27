import { Schema, model } from "mongoose";

const schema = new Schema(
  {
    text: String,
    image: String,
    senderId: {
      type: String,
      required: true,
    },
    receiverId: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

schema.pre("save", function(next)  {
  if (!this.text && !this.image) {
    return next(new Error("Message text or image must be provided"));
  }
  next();
});

export const Message = model("Message", schema);
