import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { UnexpectedError, ValidationFailedError } from "../../utils/errors";
import { generateToken } from "../../utils/jwt";
import { comparePassword, hashPassword } from "../../utils/bcrypt";
import { AuthenticatedRequest } from "../../middleware/check-session";
import { Category } from "../event/schema";

class UserController {
  constructor(private prisma: PrismaClient) {}

  async findUser(email: string) {
    const user = await this.prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        email: true,
        password: true,
      }
    });
    if (!user) {
      throw new UnexpectedError('Failed to get user');
    }
    return user; 
  }

  login = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const user = await this.findUser(email);
    if (!user) {
      throw new ValidationFailedError('login failed', {
        'email': ['invalid credentials'],
        'password': ['invalid credentials'],
      });
    }

    const isPwdValid = await comparePassword(password, user.password); 
    if (!isPwdValid) {
      throw new ValidationFailedError('login failed', {
        'email': ['invalid credentials'],
        'password': ['invalid credentials'],
      });
    }

    const token = generateToken({ userId: user.id, email: user.email });

    return res.json({
      token,
      user: {
        userId: user.id,
        email: user.email,
      },
      message: 'User logged in successfully',
    });
  };

  signup = async (req: Request, res: Response) => {
    const { email, name, phone, password,bio } = req.body;
    const hashedPassword = await hashPassword(password);
    const user = await this.prisma.user.create({
      data: {
        email: email,
        name: name,
        phone: JSON.stringify(phone),
        password: hashedPassword,
        bio: bio,
      },
    });
    if (!user) {
      throw new UnexpectedError('Failed to create user');
    }
    return res.json({ user });
  };

  getFollowingEvents = async (req: AuthenticatedRequest, res: Response) => {
    const { category, date, page = 1, limit = 10 } = req.query;
  
    const filters: any = {};
  
    if (category) filters.category = category as Category;
    if (date) filters.date = new Date(String(date));
    const userId = req.user?.userId;
    
    const followers = await this.prisma.user.findMany({
      where: {
        followers: {
          some: {
            followerId: userId,
          },
        },
      },
      select: {
        id: true,
        name: true,
        events: {
          where: filters,
          include: {
            comments: true,
            likes: true,
            _count: {
              select: {
                comments: true,
                likes: true,
              },
            },
          },
        },
      },
     
    });

    if (!followers) {
      throw new UnexpectedError("Failed to get following user's events");
    }

    return res.json({
      page: Number(page),
      limit: Number(limit),
      followers});
  };

}

export default UserController;

