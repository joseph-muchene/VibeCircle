import express from "express";
import { LoginUser } from "../Controller/Auth.controller.js";
const router = express.Router();

// login route
// @tested
router.route("/auth/login").post(LoginUser);

export default router;
