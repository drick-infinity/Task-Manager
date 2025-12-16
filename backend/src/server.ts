import dotenv from "dotenv";
import cookieParser from 'cookie-parser';
import express,{ Request, Response } from "express"; 
import cors from 'cors';
import authRoutes from './routes/authRoutes';
dotenv.config();
const app = express();
const PORT = process.env.PORT;
app.use(cors({
  origin:'http://localhost:5173',
  credentials:true,
}))
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.get("/", (req: Request, res: Response) => {
  res.send("Hello, TypeScript Backend!");
});
app.use('/api/v1',authRoutes);
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
