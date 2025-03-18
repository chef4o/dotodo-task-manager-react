import express from "express";
import {
  getAllChecklistsByUser,
  getChecklist,
  deleteChecklist,
  editChecklist,
  createChecklist,
} from "../controllers/checklistController.js";

const router = express.Router();

router.get("/:userId", getAllChecklistsByUser);
router.get("/:id", getChecklist);
router.delete("/delete/:id", deleteChecklist);
router.put("/edit/:id", editChecklist);
router.post("/add", createChecklist);

export default router;
