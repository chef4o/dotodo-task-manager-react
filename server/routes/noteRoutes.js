import express from "express";
import { getAllNotesByUser, getNote, deleteNote, editNote, createNote } from "../controllers/noteController.js";

const router = express.Router();

router.get("/:userId", getAllNotesByUser);
router.get("/:id", getNote);
router.delete("/delete/:id", deleteNote);
router.put("/edit/:id", editNote);
router.post("/add", createNote);

export default router;
