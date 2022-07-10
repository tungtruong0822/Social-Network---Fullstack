import mongoose from "mongoose";
const commentSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      default: "",
    },
    reply: { type: mongoose.Types.ObjectId, ref: "comment" },
    userId: { type: mongoose.Types.ObjectId, ref: "user" },
    postId: { type: mongoose.Types.ObjectId, ref: "post" },
  },
  { timestamps: true }
);
export default mongoose.model("comment", commentSchema);
