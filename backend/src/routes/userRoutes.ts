import express from 'express';
import { getUser } from '../controllers/userController';
import { authMiddleware } from '../middleware/authMiddleware';
const userRoutes = express.Router();

userRoutes.get('/data',authMiddleware,getUser);

export default userRoutes;