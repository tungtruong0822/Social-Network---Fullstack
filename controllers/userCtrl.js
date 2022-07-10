import Users from "../models/userModel.js";
import bcrypt from "bcrypt";

const UserCtrl = {
  updateUser: async (req, res) => {
    try {
      if (req.body._id === req.params.id) {
        // if (req.body.password) {
        //   req.body.password = await bcrypt.hash(req.body.password, 10);
        // }
        const user = await Users.findOneAndUpdate(
          { _id: req.body._id },
          { $set: req.body },
          { new: true }
        );
        if (!user) {
          return res.status(400).json({ msg: "User incorrect" });
        }
        return res.status(200).json({ msg: "Update Success", user });
      } else {
        return res.status(400).json({ msg: "dell phai may" });
      }
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  deleteUser: async (req, res) => {
    try {
      if (req.body._id === req.params.id || req.body.isAdmin) {
        const user = await Users.findOneAndDelete({ _id: req.body_id });
        if (!user) return res.status(400).json({ msg: "User don't exist" });

        res.json({ msg: "Delete User..." });
      }
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  getUser: async (req, res) => {
    try {
      const user = await Users.findOne({ _id: req.params.id })
        .populate("followers", "-password")
        .populate("followings", "-password");

      if (!user) return res.status(400).json({ msg: "User don't exist" });

      res.json({ user });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  getAllUser: async (req, res) => {
    try {
      const user = await Users.find();
      if (!user) return res.status(400).json({ msg: "User don't exist" });

      res.json({ user });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  findUsers: async (req, res) => {
    try {
      const users = await Users.find({
        userName: { $regex: req.query.name, $options: "i" },
      }).limit(8);
      res.json({ users });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  followUser: async (req, res) => {
    try {
      if (req.body._id !== req.params.id) {
        const user = await Users.findById(req.params.id);
        const currentUser = await Users.findById(req.body._id);
        if (!user.followers.includes(req.body._id)) {
          await user.updateOne({ $push: { followers: req.body._id } });
          await currentUser.updateOne({
            $push: { followings: req.params.id },
          });
          res.status(200).json({ msg: "user has been followed" });
        } else {
          return res.status(400).json({ msg: "you allready follow this user" });
        }
      }
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  unFollowUser: async (req, res) => {
    try {
      if (req.body._id !== req.params.id) {
        const user = await Users.findById(req.params.id);
        const currentUser = await Users.findById(req.body._id);
        if (user.followers.includes(req.body._id)) {
          await user.updateOne({ $pull: { followers: req.body._id } });
          await currentUser.updateOne({
            $pull: { followings: req.params.id },
          });
          res.status(200).json({ msg: "user has been unfollowed" });
        } else {
          return res.status(400).json({ msg: "you don't follow this user" });
        }
      }
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

export default UserCtrl;
