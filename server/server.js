import express from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import noteRoutes from './routes/noteRoutes.js';
import newsRoutes from './routes/newsRoutes.js';
import checklistRoutes from './routes/checklistRoutes.js';
import contactRoutes from './routes/contactRoutes.js';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/notes', noteRoutes);
app.use('/checklists', checklistRoutes);
app.use('/contact-us', contactRoutes);
app.use('/news', newsRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});