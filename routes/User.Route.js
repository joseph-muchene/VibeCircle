import express from "express";
import {
  DeleteUser,
  VerifiedUser,
  createUser,
  findAllUsers,
  followUser,
  getAnyUserById,
  getUserById,
  unfollowUser,
  updateUser,
} from "../Controller/User.controller.js";
import { VerifyToken } from "../Middlewares/VerifyToken.js";
const router = express.Router();

// create user
router.route("/user/create").post(createUser);

// update user
router.route("/user/update/:userId").put(VerifyToken, updateUser);

// delete user
router.route("/user/delete/:userId").delete(VerifyToken, DeleteUser);

// verified user
router.route("/user/verified").get(VerifyToken, VerifiedUser);

// find all users
router.route("/user/find").get(findAllUsers);

// get a current user
router.route("/user/current").get(VerifyToken, getUserById);

// get any user by Id
router.route("/user/find/:userId").get(getAnyUserById);

// follow user
router.route("/user/follow/:userId").put(VerifyToken, followUser);

// unfollow user
router.route("/user/unfollow/:userId").put(VerifyToken, unfollowUser);

export default router;
