import express from "express";
import mongoose from "mongoose";
import Cvsts from "../models/conversationModel.js";
import Msgs from "../models/messageModel.js";

const conversationCtrl = {
  createMessage: async (req, res) => {
    try {
      const { sender, totalUser, content, media, conversation } = req.body;
      if (!content.trim() && media.length < 0) return;
      let newMessage, newConversation;
      if (conversation) {
        newConversation = await Cvsts.findOneAndUpdate(
          { _id: conversation },
          { content, media },
          { new: true }
        );
        if (!newConversation) res.json({ msg: "Comversation not exist" });
        newMessage = new Msgs({
          conversation: newConversation._id,
          sender,
          content,
          media,
        });
        // console.log(newConversation);
        await newMessage.save();
        return res.json({ newMessage, msg: "Create message success 1" });
      } else {
        newConversation = await Cvsts.findOneAndUpdate(
          {
            $or: [
              { totalUser: [...totalUser, sender] },
              { totalUser: [sender, ...totalUser] },
            ],
          },
          {
            totalUser: [...totalUser, sender],
            content,
            media,
          },
          { new: true, upsert: true }
        );
        newMessage = new Msgs({
          conversation: newConversation._id,
          sender,
          content,
          media,
        });

        await newMessage.save();
        return res.json({ newMessage, msg: "Create message success 2" });
      }
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  //get Convetsation User
  getConversations: async (req, res) => {
    try {
      const { id } = req.body;
      const Conversations = await Cvsts.find({
        totalUser: { $in: [`${id}`] },
      })
        .populate("totalUser", "-password")
        .sort("-updatedAt");
      res.json(Conversations);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  //get Message
  getMessages: async (req, res) => {
    try {
      const msgs = await Msgs.aggregate([
        { $match: { conversation: mongoose.Types.ObjectId(req.params.id) } },
        { $sort: { createdAt: -1 } },
      ]);
      res.json({ msgs });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  addUserInConversation: async (req, res) => {
    try {
      let newConversation;
      const { conversationId, userId, isGroup, authId, nameGroup } = req.body;
      if (isGroup) {
        const testRepeat = await Cvsts.findOne({
          $and: [{ _id: conversationId }, { totalUser: { $in: [userId] } }],
        });

        if (testRepeat) {
          return res.status(400).json({
            msg: "Menbership already exists in conversation !",
          });
        }

        newConversation = await Cvsts.findOneAndUpdate(
          { _id: conversationId },
          { $push: { totalUser: userId } },
          { new: true }
        );
        return res.json({ msg: "add user to Conversation", newConversation });
      } else {
        const conversation = await Cvsts.findOne({
          $and: [{ _id: conversationId }, { isGroup: false }],
        });

        const testRepeat = await Cvsts.findOne({
          $and: [{ _id: conversationId }, { totalUser: { $in: [userId] } }],
        });

        if (testRepeat) {
          return res
            .status(400)
            .json({ msg: "Menbership already exists in conversation !" });
        }
        newConversation = new Cvsts({
          totalUser: [...conversation.totalUser, userId],
          isGroup: true,
          founder: authId,
          nameGroup,
        });
        newConversation = await newConversation.save();
        return res.json({
          msg: "Create a new Group chat and user has add to this Conversation",
          newConversation,
        });
      }
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  removeUserInConversation: async (req, res) => {
    try {
      const { _id, userId, isGroup } = req.body;
      let newConversation;
      const Conversation = await Cvsts.findOne({ _id });
      if (isGroup && Conversation.totalUser.legth > 2) {
        newConversation = await Cvsts.findOneAndUpdate(
          { _id },
          { $pull: { totalUser: userId } },
          { new: true }
        );
      }
      if (isGroup && Conversation.totalUser.legth <= 2) {
        await Cvsts.deleteOne({ _id });
      }
      res.json(newConversation);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  deleteConversation: async (req, res) => {
    try {
      const { _id } = req.body;
      await Cvsts.deleteOne({ _id });
      await Msgs.deleteMany({ conversation: _id });
      res.json({ msg: "Conversation has delete !" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  deleteMessage: async (req, res) => {
    try {
      const { _id } = req.body;
      await Msgs.deleteOne({ _id });
      res.json({ msg: "Message has been deleted" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

export default conversationCtrl;
