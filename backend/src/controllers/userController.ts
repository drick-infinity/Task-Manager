import { Response ,Request} from "express";
import prisma from "../config/prisma";
import { AuthRequest } from "../middleware/authMiddleware";

export const getUser = async (req: AuthRequest, res: Response) => {
    const user = await prisma.user.findUnique({
      where: { id: Number(req.userId) },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });
  
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
  
    return res.json({
      success: true,
      data: user,
    });
  };
  
  export const getall = async(req:Request,res:Response)=>{
    try {
      const users = await prisma.user.findMany(); // Fetch all users from the database
      res.json({ success: true, data: users });
    } catch (error) {
      console.error('Error fetching users:', error);
      res.status(500).json({ success: false, message: 'Failed to fetch users' });
    }
  }