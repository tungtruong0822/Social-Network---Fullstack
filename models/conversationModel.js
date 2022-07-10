import mongoose from "mongoose";
const conversationSchema = new mongoose.Schema(
  {
    totalUser: [{ type: mongoose.Types.ObjectId, ref: "user" }],
    founder: { type: mongoose.Types.ObjectId, ref: "user" },
    content: { type: String, default: "" },
    nameGroup: { type: String, default: "" },
    avatarGroup: {
      type: String,
      default:
        "https://res.cloudinary.com/dujubytqp/image/upload/v1641486830/social-upload/m30uf0izyvjd6lt6ef3p.jpg",
    },
    isGroup: { type: Boolean, default: false },
    media: Array,
    call: Object,
  },
  { timestamps: true }
);
export default mongoose.model("conversation", conversationSchema);
