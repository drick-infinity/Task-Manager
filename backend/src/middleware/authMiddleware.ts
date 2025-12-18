import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export interface AuthRequest extends Request {
  userId?: number; // correctly typed as number
}

export const authMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  // Get token from cookies or Authorization header
  const token = req.cookies?.token || req.headers.authorization?.split(" ")[1];
  const userId = req.cookies.userId;
  if (!token) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: number | string };
    req.userId = Number(decoded.id);

    if (isNaN(req.userId)) {
      return res.status(401).json({ success: false, message: "Invalid token ID" });
    }

    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: "Invalid or expired token" });
  }
};
