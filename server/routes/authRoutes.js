import express from 'express';
import {  registerUser, checkUserExistence} from '../controllers/authController.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/validate-existing-user', checkUserExistence);

export default router;
