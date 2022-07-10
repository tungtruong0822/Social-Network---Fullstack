import mongoose from "mongoose";
const uesrSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: [true, ""],
      trim: true,
      min: 3,
      max: 20,
      unique: true,
    },
    email: {
      type: String,
      unique: true,
      max: 50,
      required: true,
    },
    password: {
      type: String,
      unique: true,
      min: 6,
      required: true,
    },
    avatar: {
      type: String,
      default:
        "https://res.cloudinary.com/devatchannel/image/upload/v1602752402/avatar/avatar_cugq40.png",
    },
    coverPicture: {
      type: String,
      default:
        "https://res.cloudinary.com/dujubytqp/image/upload/v1638202912/social-upload/i1ycz1padmzskv8dbeuk.jpg",
    },
    followers: [{ type: mongoose.Types.ObjectId, ref: "user" }],

    followings: [{ type: mongoose.Types.ObjectId, ref: "user" }],
    isAdmin: {
      type: Boolean,
      default: false,
    },
    desc: {
      type: String,
      max: 200,
    },
    from: {
      type: String,
      max: 50,
    },
    relationship: {
      type: Number,
      enum: [1, 2, 3],
    },
  },
  { timestamps: true }
);
export default mongoose.model("user", uesrSchema);
