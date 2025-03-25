import express from "express";
import { getAllUsers, getUserByEmail, getUserById, getUserByUsername, deleteUserById, editUser } from "../controllers/userController.js";

const router = express.Router();

router.get("/", getAllUsers);
router.get("/:id", getUserById);
router.put("/edit/:id", editUser);
router.delete("/delete/:id", deleteUserById)
router.get("/username/:username", getUserByUsername);
router.get("/email/:email", getUserByEmail);

export default router;
