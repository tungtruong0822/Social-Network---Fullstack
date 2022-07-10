import express from "express";
import userCtrl from "../controllers/userCtrl.js";

const router = express.Router();

router.patch("/:id/follower", userCtrl.followUser);
router.patch("/:id/unfollower", userCtrl.unFollowUser);
router.get("/:id", userCtrl.getUser);
router.post("/getalluser", userCtrl.getAllUser);
router.post("/findname", userCtrl.findUsers);
router.delete("/:id/deleteUser", userCtrl.deleteUser);
router.post("/:id/editprofile", userCtrl.updateUser);

export default router;
