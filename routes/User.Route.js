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
//@tested
router.route("/user/create").post(createUser);

// update user
// @tested
router.route("/user/update/:userId").put(VerifyToken, updateUser);

// delete user
// @tested
router.route("/user/delete/:userId").delete(VerifyToken, DeleteUser);

// verified user
// @tested
router.route("/user/verified/me").get(VerifyToken, VerifiedUser);

// find all users
// @tested
router.route("/user/find").get(findAllUsers);

// get a current user
// @tested
router.route("/user/current").get(VerifyToken, getUserById);

// get any user by Id
// @tested
router.route("/user/find/:userId").get(getAnyUserById);

// follow user
// @tested
router.route("/user/follow/:userId").put(VerifyToken, followUser);

// unfollow user
// @tested
router.route("/user/unfollow/:userId").put(VerifyToken, unfollowUser);

export default router;
