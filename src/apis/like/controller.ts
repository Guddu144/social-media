import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { UnexpectedError, ValidationFailedError } from "../../utils/errors";
import { AuthenticatedRequest } from "../../middleware/check-session";

class LikeController {
  constructor(private prisma: PrismaClient) {}

  create = async (req: AuthenticatedRequest, res: Response) => {
    const { eventId } = req.body;
    const userId = req.user?.userId;

    const existingLike = await this.prisma.like.findFirst({
      where: {
        eventId:Number(eventId),
        userId,
      },
    });

    if (existingLike) {
      throw new ValidationFailedError("Like already exists", {
        eventId: ["You have already liked this event"],
      });
    }

    const like = await this.prisma.like.create({
      data: {
        eventId:Number(eventId),
        userId,
      },
    });

    if (!like) {
      throw new UnexpectedError("Failed to create like");
    }

    return res.status(201).json({ like, message: "Like created successfully" });
  };

  list = async (req: Request, res: Response) => {
    const { eventId, page = 1, limit = 10 } = req.query;

    const filters: any = {};

    if (eventId) filters.eventId = Number(eventId);

    const likes = await this.prisma.like.findMany({
      where: filters,
      skip: (Number(page) - 1) * Number(limit),
      take: Number(limit),
      include: {
        user: true,  
        event: true, 
      },
    });

    const totalLikes = await this.prisma.like.count({ where: filters });

    return res.json({
      total: totalLikes,
      page: Number(page),
      limit: Number(limit),
      likes,
    });
  };

}

export default LikeController;
