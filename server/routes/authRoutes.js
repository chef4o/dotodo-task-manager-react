import express from "express";
import { registerUser, checkUserExistence } from "../controllers/authController.js";
import { createCustomToken } from "../configuration/firebaseConfig.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/custom-token", createCustomToken);
router.post("/validate-existing-user", checkUserExistence);

export default router;
