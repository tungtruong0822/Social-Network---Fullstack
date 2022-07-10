import postCtrl from "../controllers/postCtrl.js";
import express from "express";

const router = express.Router();

router.get("/:id/getpost", postCtrl.getPost);
router.get("/:id/getuserpost", postCtrl.getUserPost);
router.post("/createpost", postCtrl.createPost);
router.delete("/:id/deletepost", postCtrl.deletePost);
router.patch("/:id/updatepost", postCtrl.updatePost);
router.patch("/:id/like", postCtrl.likeAndUnlike);
router.post("/home", postCtrl.getAllpost);

export default router;
