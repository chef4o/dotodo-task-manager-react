import express from "express";
import { createArticle, editArticle, getAllNews, getArticle } from "../controllers/newsController.js";

const router = express.Router();

router.get("/", getAllNews);
router.get("/:id", getArticle);
router.put("/edit/:id", editArticle);
router.post("/add", createArticle);

export default router;
