import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import todoRoutes from './routes/todo.js';


dotenv.config();


const app = express();
const PORT = process.env.PORT || 4000;


// Security middlewares
app.use(helmet());
app.use(express.json());
app.use(cookieParser());


// CORS - allow credentials for cookies
app.use(cors({
origin: process.env.CLIENT_URL || 'http://localhost:3000',
credentials: true
}));


// Rate limiting for auth endpoints
const authLimiter = rateLimit({
windowMs: 10 * 60 * 1000, // 10 minutes
max: 20,
message: { error: 'Too many requests from this IP, please try again later.' }
});


app.use('/auth', authLimiter);


app.use('/auth', authRoutes);
app.use('/todos', todoRoutes);


// Global error handler
app.use((err, req, res, next) => {
console.error(err);
res.status(err.status || 500).json({ error: err.message || 'Server Error' });
});


// Connect DB & start
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => {
console.log('Connected to MongoDB');
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
})
.catch(err => {
console.error('DB connection error', err);
});