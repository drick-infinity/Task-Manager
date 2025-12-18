import dotenv from "dotenv";
import cookieParser from 'cookie-parser';
import express,{ Request, Response } from "express"; 
import cors from 'cors';
import authRoutes from './routes/authRoutes';
import userRoutes from "./routes/userRoutes";
import taskRoutes from "./routes/taskRoutes";
dotenv.config();
const app = express();
const PORT = process.env.PORT;
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin:'http://localhost:5173',
  credentials:true,
}))
app.use('/api/users',userRoutes);
app.use('/api/v1',authRoutes);
app.use('/api/task',taskRoutes);
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
