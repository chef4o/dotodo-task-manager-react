import express from 'express';
import { sendContactRequest } from '../controllers/contactsController.js';

const router = express.Router();

router.post('/send', sendContactRequest);

export default router;
