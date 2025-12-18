import express from 'express';
import { getall, getUser } from '../controllers/userController';
import { authMiddleware } from '../middleware/authMiddleware';
const userRoutes = express.Router();

userRoutes.get('/data',authMiddleware,getUser);
userRoutes.get('/allusers',getall);

export default userRoutes;