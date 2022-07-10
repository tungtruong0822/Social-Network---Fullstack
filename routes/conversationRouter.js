import express from "express";
import conversationCtrl from "../controllers/conversationCtrl.js";

const router = express.Router();

router.post("/message", conversationCtrl.createMessage);
router.post("/conversations", conversationCtrl.getConversations);
router.post("/:id/conversation", conversationCtrl.getMessages);
router.patch("/adduserinconversation", conversationCtrl.addUserInConversation);
router.patch(
  "/removeUserInConversation",
  conversationCtrl.removeUserInConversation
);
router.delete("/deleteConversation", conversationCtrl.deleteConversation);
router.delete("/deleteMessage", conversationCtrl.deleteMessage);

export default router;
