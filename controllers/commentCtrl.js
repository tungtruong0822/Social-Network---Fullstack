import CMs from "../models/commentModel.js";
import Posts from "../models/postModel.js";
import mongoose from "mongoose";

const commentCtrl = {
  createComment: async (req, res) => {
    try {
      const { userId, reply, content, postId } = req.body;

      const newComment = new CMs({
        content,
        reply,
        userId,
        postId,
      });

      await Posts.findOneAndUpdate(
        { _id: postId },
        {
          $push: { comments: newComment._id },
        },
        { new: true }
      );
      await newComment.save();
      res.json({ msg: "Create Comment Success...", newComment });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  deleteComment: async (req, res) => {
    try {
      await CMs.findOneAndDelete({ _id: req.params.id });

      res.status(200).json({ msg: "Delete Comment Success..." });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  updateComment: async (req, res) => {
    try {
      const { content } = req.body;
      const newComment = await CMs.findOneAndUpdate(
        { _id: req.params.id },
        { content },
        { new: true }
      );
      console.log(newComment);

      res.status(200).json({ msg: "Update Comment Success...", newComment });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

export default commentCtrl;
