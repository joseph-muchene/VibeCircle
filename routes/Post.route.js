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
//@tested
router.route("/post/create").post(VerifyToken, createPost);

// delete post
//@tested
router.route("/post/delete/:postId").delete(VerifyToken, DeletePost);

// update post
//@tested
router.route("/post/update/:postId").put(VerifyToken, UpdatePost);

// read post
// @tested
router.route("/post/read/:postId").get(readPost);

// like post
//@tested
router.route("/post/like/:postId").put(VerifyToken, LikePost);

// comment post
//@tested
router.route("/post/comment/:postId").put(VerifyToken, CommentPost);

// delete comment
//@tested
router.route("/post/comment/delete/:postId").delete(VerifyToken, DeleteComment);

// find all posts
// @tested
router.route("/post/find/all").get(findAllPosts);

// find user post
// @tested
router.route("/post/find/user/all").get(VerifyToken, findUserPost);

export default router;
