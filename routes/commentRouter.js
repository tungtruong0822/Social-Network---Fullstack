import express from "express";
import commentCtrl from "../controllers/commentCtrl.js";

const router = express.Router();

router.post("/createComment", commentCtrl.createComment);
router.patch("/:id/updateComment", commentCtrl.updateComment);
router.delete("/deleteComment/:id", commentCtrl.deleteComment);

export default router;
