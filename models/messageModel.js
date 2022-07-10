import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    conversation: { type: mongoose.Types.ObjectId, ref: "conversation" },
    sender: { type: mongoose.Types.ObjectId, ref: "user" },
    content: { type: String },
    media: { type: Array, default: [] },
    call: Object,
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("message", messageSchema);
