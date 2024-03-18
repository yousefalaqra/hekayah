import express from 'express';
import connectDB from './database';
import router from './routes';
import dotenv from 'dotenv';
import cors from 'cors'

// Load environment variables from .env file
dotenv.config();

const app = express();



const PORT = process.env.PORT || 3000;

// Connect to MongoDB
connectDB();

// Cors Middleware
const allowedOrigins = ['http://localhost:4200'];
const corsOptions = {
  origin: allowedOrigins
};
app.use(cors(corsOptions));

// Middleware
app.use(express.json());

// Routes
app.use('/', router);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
