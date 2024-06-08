import express from "express";
const router = express.Router();

import upload from "../middleware/upload.middelware.js";
import authenticateUser from "../middleware/auth.middleware.js";

import {
  signup,
  userList,
  userDetails,
  login,
  // userDelete
} from "../controller/auth.controller.js";

router.route("/signup").post(upload, signup);
router.route("/users").get(userList);
router.route("/profile").get(authenticateUser,userDetails);
router.route("/login").post(login);
// router.route("/delete").delete(authenticateUser,userDelete);

export default router;
