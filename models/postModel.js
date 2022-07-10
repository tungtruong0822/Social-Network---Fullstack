import mongoose from "mongoose";
const postSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Types.ObjectId, ref: "user" },
    desc: {
      type: String,
      max: 500,
    },
    img: {
      type: Array,
    },
    likes: [{ type: mongoose.Types.ObjectId, ref: "user" }],
    comments: [{ type: mongoose.Types.ObjectId, ref: "comment" }],
  },
  { timestamps: true }
);
export default mongoose.model("post", postSchema);
