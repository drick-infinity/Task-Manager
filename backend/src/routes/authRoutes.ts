import express from "express";
import { login, logout, register } from "../controllers/authController";
const authRoutes = express.Router();
authRoutes.post("/register", register);
authRoutes.post("/", login);
authRoutes.post("/logout", logout);

export default authRoutes;
