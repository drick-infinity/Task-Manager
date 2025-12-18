import { createTask, getAssignedTasks, getTasks } from "../controllers/taskController";
import express from "express";
import { authMiddleware } from "../middleware/authMiddleware";
import prisma from "../config/prisma";
const taskRoutes = express.Router();
taskRoutes.post("/createtask", authMiddleware,createTask); 
taskRoutes.get("/tasks", authMiddleware, async (req, res) => {
    res.setHeader("Cache-Control", "no-store"); // disables caching
    const tasks = await prisma.task.findMany({ orderBy: { createdAt: "desc" }, take: 50 });
    res.status(200).json({ success: true, data: tasks });
  });  
taskRoutes.get("/assigned", authMiddleware, getAssignedTasks);
export default taskRoutes;