import express from "express";
const router = express.Router();
import {
  createPost,
  DeletePost,
  UpdatePost,
  readPost,
  LikePost,
  CommentPost,
  DeleteComment,
  findAllPosts,
  findUserPost,
} from "../Controller/Post.controller.js";
import { VerifyToken } from "../Middlewares/VerifyToken.js";

// create post
router.route("/post/create").post(VerifyToken, createPost);

// delete post
router.route("/post/delete/:postId").delete(VerifyToken, DeletePost);

// update post
router.route("/post/update/:postId").put(VerifyToken, UpdatePost);

// read post
router.route("/post/read/:postId").get(readPost);

// like post
router.route("/post/like/:postId").get(VerifyToken, LikePost);

// comment post
router.route("/post/comment/:postId").get(VerifyToken, CommentPost);

// delete comment
router.route("/post/comment/delete/:postId").delete(VerifyToken, DeleteComment);

// find all posts
router.route("/post/find/all").get(findAllPosts);

// find user post
router.route("/post/find/user/all").get(findUserPost);

export default router;
