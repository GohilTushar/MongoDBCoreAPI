import express from "express";
const router = express.Router();
import routerAuth from "./auth.route.js";
import routerBook from "./book.route.js";

router.use("/auth", routerAuth);
router.use("/books", routerBook);

export default router;
