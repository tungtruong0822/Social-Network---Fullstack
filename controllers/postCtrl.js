import Users from "../models/userModel.js";
import Posts from "../models/postModel.js";
import mongoose from "mongoose";

const postCtrl = {
  createPost: async (req, res) => {
    try {
      console.log(req.body);
      const post = new Posts(req.body);
      await post.save();
      res.json({ msg: "Create Post Success..." });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  updatePost: async (req, res) => {
    try {
      if (req.params.id === req.body.userId) {
        const post = await Posts.findOneAndUpdate(
          {
            _id: mongoose.Types.ObjectId(req.body._id),
          },
          { $set: req.body }
        );
        if (!post) return res.status(400).json({ msg: "Post dont exists.." });
        res.json({ msg: "the post has been updated" });
      }
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  deletePost: async (req, res) => {
    try {
      const post = await Posts.findOne({ _id: req.params.id });
      if (!post) return res.status(400).json({ msg: "Post dont exists.." });
      //if (post.userId === req.body._id || req.body.isAdmin) {
      await post.deleteOne({ _id: req.params.id });

      res.json({ msg: "the post has been delete" });
      // } else {
      //   return res.status(400).json({ msg: "You only delete your post.." });
      // }
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  likeAndUnlike: async (req, res) => {
    try {
      let msg = "";
      const post = await Posts.findOne({ _id: req.params.id });
      if (!post) return res.status(400).json({ msg: "Post dont exists.." });
      if (!post.likes.includes(req.body.userId)) {
        await post.updateOne({ $push: { likes: req.body.userId } });
        msg = "liked Post...";
      } else {
        await post.updateOne({ $pull: { likes: req.body.userId } });
        msg = "Unliked Post...";
      }
      const newpost = await Posts.findOne({ _id: req.params.id }).populate(
        "userId"
      );
      res.json({ msg, newpost });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  getPost: async (req, res) => {
    try {
      const post = await Posts.findById(req.params.id);
      if (!post) return res.status(400).json({ msg: "Post dont exists.." });
      res.json(post);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  getAllpost: async (req, res) => {
    try {
      // let posts = await Posts.aggregate([
      //   {
      //     $lookup: {
      //       from: "users",
      //       let: { user_id: "$userId" },
      //       pipeline: [
      //         { $match: { $expr: { $eq: ["$_id", "$$user_id"] } } },
      //         { $project: { password: 0 } },
      //       ],
      //       as: "userId",
      //     },
      //   },
      //   {
      //     $lookup: {
      //       from: "users",
      //       localField: "likes",
      //       foreignField: "_id",
      //       as: "likes",
      //     },
      //   },
      //   {
      //     $lookup: {
      //       from: "comments",
      //       localField: "comments",
      //       foreignField: "_id",
      //       as: "comments",
      //     },
      //   },
      //   {
      //     $lookup: {
      //       from: "users",
      //       localField: "comments.userId",
      //       foreignField: "_id",
      //       as: "comments.userId",
      //     },
      //   },
      //   { $unwind: "$userId" },
      //   { $project: { "likes.password": 0 } },
      //   { $sort: { updatedAt: -1, createdAt: -1 } },
      // ]);
      const posts = await Posts.find()
        .sort("-createdAt")
        .populate("userId likes", "-password")
        .populate({
          path: "comments",
          populate: {
            path: "userId",
            select: "-password",
          },
        });
      res.json(posts);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  getUserPost: async (req, res) => {
    try {
      // const posts = await Posts.aggregate([
      //   { $match: { userId: mongoose.Types.ObjectId(req.params.id) } },
      //   {
      //     $lookup: {
      //       from: "users",
      //       let: { user_id: "$userId" },
      //       pipeline: [
      //         { $match: { $expr: { $eq: ["$_id", "$$user_id"] } } },
      //         { $project: { password: 0 } },
      //       ],
      //       as: "userId",
      //     },
      //   },
      //   {
      //     $lookup: {
      //       from: "users",
      //       localField: "likes",
      //       foreignField: "_id",
      //       as: "likes",
      //     },
      //   },
      //   { $unwind: "$userId" },
      //   { $project: { "likes.password": 0 } },
      //   { $sort: { updatedAt: -1, createdAt: -1 } },
      // ]);
      const posts = await Posts.find({
        userId: req.params.id,
      })
        .sort("-createdAt")
        .populate("userId likes", "-password")
        .populate({
          path: "comments",
          populate: {
            path: "userId",
            select: "-password",
          },
        });
      res.json(posts);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

export default postCtrl;
