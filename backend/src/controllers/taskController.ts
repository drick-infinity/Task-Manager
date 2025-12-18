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

    // Prevent caching
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