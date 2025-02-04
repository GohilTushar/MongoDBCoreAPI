import express from "express";
const router = express.Router();

import authenticateUser from "../middleware/auth.middleware.js";
import {
  createBook,
  bookList,
  bookDetail,
  deleteBook,
  updateBook,
} from "../controller/book.controller.js";

router.use(authenticateUser)
router.route("/").post(createBook);
router.route("/").get(bookList);
router.route("/:id").get(bookDetail);
router.route("/:id").delete(deleteBook);
router.route("/:id").put(updateBook);

export default router;
