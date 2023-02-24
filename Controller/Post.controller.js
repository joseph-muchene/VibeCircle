import Post from "../models/Post.model.js";
import crypto from "crypto";

// create a post
export const createPost = async (req, res) => {
  try {
    const newPost = new Post(req.body);

    const savedPost = await newPost.save();

    return res.status(200).json(savedPost);
  } catch (error) {
    return res.status(500).json({ "server errror": error.message });
  }
};
// delete a post
export const DeletePost = async (req, res) => {
  try {
    const user = req.user._id;
    const postId = req.params.postId;

    const post = await Post.findById({ _id: postId });

    if (post.userId.toString() !== user) {
      return res
        .status(403)
        .json("you are not authorized to perform this action");
    } else {
      const removedPost = await Post.findByIdAndRemove(post._id);

      return res.status(200).json(removedPost);
    }
  } catch (error) {
    return res.status(500).json({ "server errror": error.message });
  }
};
// update a post
export const UpdatePost = async (req, res) => {
  try {
    const postId = req.params.postId;
    const verifiedUser = req.user._id;

    if (verifiedUser.toString() !== postId)
      return res.status(403).json("Not authorized");
    Post.findByIdAndUpdate(
      postId,
      { $set: req.body },
      { new: true },
      (err, result) => {
        if (err) return res.status(404).json("post was not found");

        return res.status(200).json(result);
      }
    );
  } catch (error) {
    return res.status(500).json("server error");
  }
};
// read a post
export const readPost = async (req, res) => {
  const post = await Post.findById(req.params.postId);
  return res.status(200).json(post);
};
// like post
export const LikePost = async (req, res) => {
  try {
    // get post
    const post = await Post.findById(req.params.postId);

    // check if the post is already liked unlike

    if (post.likes.indexOf(req.user._id) !== -1) {
      post.likes.filter((like) => like !== req.user._id);
    }
    // add a like

    post.likes.map((like) => [...like, req.user._id]);

    // update the db
    Post.findByIdAndUpdate(
      post._id,
      { ...post },
      { new: true },
      (err, data) => {
        if (err) {
          return res.status(400).json("could not update");
        } else {
          return res.status(200).json(data);
        }
      }
    );
  } catch (error) {
    return res.status(500).json("server error");
  }
};
// comment on a post
export const CommentPost = async (req, res) => {
  try {
    let post;
    post = await Post.findById({ _id: req.params.postId });
    const { text } = req.body;
    post.comments.map((comment) => [
      ...comment,
      {
        commentId: crypto.randomBytes(16).toString("hex"),
        text,
      },
    ]);

    // update the db
    Post.findByIdAndUpdate(
      post._id,
      { ...post },
      { new: true },
      (err, data) => {
        if (err) {
          return res.status(400).json("could not update");
        } else {
          return res.status(200).json(data);
        }
      }
    );
  } catch (error) {
    return res.status(500).json("server error");
  }
};
// delete comment
export const DeleteComment = async (req, res) => {
  try {
    const commentId = req.body.commentId;
    const userId = req.user._id;

    const post = await Post.findById({ _id: req.params.postId });

    if (post.userId.toString() !== userId.toString())
      return res.status(403).json("Not authorized");
    post.comments.filter((comment) => comment.commenterId !== commentId);

    // update the db
    Post.findByIdAndUpdate(
      post._id,
      { ...post },
      { new: true },
      (err, data) => {
        if (err) {
          return res.status(400).json("could not update");
        } else {
          return res.status(200).json(data);
        }
      }
    );
  } catch (error) {
    return res.status(500).json("server error");
  }
};
// fetch all users post
export const findAllPosts = async (req, res) => {
  const posts = await Post.find().select("-userId").limit(50).sort("-desc");

  return res.status(200).json(posts);
};

// fetch all user post
export const findUserPost = async (req, res) => {
  const userPosts = await Post.find({ userId: req.user.id });

  return res.status(200).json(userPosts);
};
