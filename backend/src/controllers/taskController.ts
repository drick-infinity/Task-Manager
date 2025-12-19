import { Response } from "express";
import prisma from "../config/prisma";
import { AuthRequest } from "../middleware/authMiddleware";

const PRIORITY_ENUM = ["Low", "Medium", "High"] as const;
const STATUS_ENUM = ["ToDo", "InProgress", "Review", "Completed"] as const;

export const createTask = async (req: AuthRequest, res: Response) => {
  const { title, description, dueDate, priority, status, assignedToId } = req.body ?? {};

  if (!title || !dueDate || !priority || assignedToId == null) {
    return res.status(400).json({
      success: false,
      message: "Missing required fields",
    });
  }

  const creatorId = Number(req.userId);
  if (Number.isNaN(creatorId)) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }

  if (!PRIORITY_ENUM.includes(priority)) {
    return res.status(400).json({
      success: false,
      message: `Invalid priority. Allowed: ${PRIORITY_ENUM.join(", ")}`,
    });
  }

  const parsedDate = new Date(dueDate);
  if (Number.isNaN(parsedDate.getTime())) {
    return res.status(400).json({
      success: false,
      message: "Invalid due date",
    });
  }

  try {
    const assignedUser = await prisma.user.findUnique({
      where: { id: Number(assignedToId) },
    });

    if (!assignedUser) {
      return res.status(404).json({
        success: false,
        message: "Assigned user not found",
      });
    }

    const task = await prisma.task.create({
      data: {
        title,
        description,
        dueDate: parsedDate,
        priority,
        status: STATUS_ENUM.includes(status) ? status : "ToDo",
        creatorId,
        assignedToId: Number(assignedToId),
      },
    });

    return res.status(201).json({
      success: true,
      message: "Task created successfully",
      data: task,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message || "Internal server error",
    });
  }
};



export const getTasks = async (req: AuthRequest, res: Response) => {
  const userId = Number(req.userId);

  if (Number.isNaN(userId)) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }

  try {
    const tasks = await prisma.task.findMany({
      where: {
        OR: [
          { creatorId: userId },
          { assignedToId: userId },
        ],
      },
      orderBy: { createdAt: "desc" },
      take: 50,
    });
    res.setHeader("Cache-Control", "no-store");

    return res.status(200).json({
      success: true,
      data: tasks,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message || "Internal server error",
    });
  }
};

export const getAssignedTasks = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.userId) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const tasks = await prisma.task.findMany({
      where: { assignedToId: req.userId },
    });

    return res.json({ success: true, tasks });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: "Failed to fetch assigned tasks" });
  }
};

export const deleteTask = async (req: AuthRequest, res: Response) => {
  const { id } = req.params;

  if (!id || isNaN(Number(id))) {
    return res.status(400).json({ success: false, message: "Invalid task ID" });
  }

  try {
    const task = await prisma.task.findUnique({
      where: { id: Number(id) },
    });

    if (!task) {
      return res.status(404).json({ success: false, message: "Task not found" });
    }

    if (task.creatorId !== req.userId) {
      return res.status(403).json({ success: false, message: "Forbidden: Not the task creator" });
    }

    await prisma.task.delete({ where: { id: Number(id) } });

    return res.status(200).json({ success: true, message: "Task deleted successfully" });
  } catch (err: any) {
    console.error("Delete task error:", err);
    return res.status(500).json({ success: false, message: err.message || "Internal server error" });
  }
};

export const updateTask = async (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  const { title, description, dueDate, priority, status, assignedToId } = req.body ?? {};

  if (!title || !dueDate || !priority || assignedToId == null) {
    return res.status(400).json({ success: false, message: "Missing required fields" });
  }

  if (!PRIORITY_ENUM.includes(priority)) {
    return res.status(400).json({ success: false, message: `Invalid priority. Allowed: ${PRIORITY_ENUM.join(", ")}` });
  }

  if (!STATUS_ENUM.includes(status)) {
    return res.status(400).json({ success: false, message: `Invalid status. Allowed: ${STATUS_ENUM.join(", ")}` });
  }

  const parsedDate = new Date(dueDate);
  if (isNaN(parsedDate.getTime())) {
    return res.status(400).json({ success: false, message: "Invalid due date" });
  }

  try {
    const task = await prisma.task.findUnique({ where: { id: Number(id) } });
    if (!task) {
      return res.status(404).json({ success: false, message: "Task not found" });
    }

    if (task.creatorId !== Number(req.userId) && task.assignedToId !== Number(req.userId)) {
      return res.status(403).json({ success: false, message: "Forbidden" });
    }

    const updatedTask = await prisma.task.update({
      where: { id: Number(id) },
      data: {
        title,
        description,
        dueDate: parsedDate,
        priority,
        status,
        assignedToId: Number(assignedToId),
      },
    });

    return res.status(200).json({ success: true, message: "Task updated successfully", data: updatedTask });
  } catch (err: any) {
    return res.status(500).json({ success: false, message: err.message || "Internal server error" });
  }
};