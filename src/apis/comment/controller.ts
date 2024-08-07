import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { UnexpectedError, ValidationFailedError } from "../../utils/errors";
import { AuthenticatedRequest } from "../../middleware/check-session";

class CommentController {
  constructor(private prisma: PrismaClient) {}

  create = async (req: AuthenticatedRequest, res: Response) => {
    const { content, eventId } = req.body;
    const userId = req.user?.userId; 

    const comment = await this.prisma.comment.create({
      data: {
        content,
        eventId:Number(eventId),
        userId,
      },
    });

    if (!comment) {
      throw new UnexpectedError("Failed to create comment");
    }

    return res.status(201).json({ comment, message: "Comment created successfully" });
  };

  getOne = async (req: Request, res: Response) => {
    const { id } = req.params;

    const comment = await this.prisma.comment.findUnique({
      where: { id: Number(id) },
      include: {
        user: true,  
        event: true, 
      },
    });

    if (!comment) {
      throw new ValidationFailedError("Comment not found", {
        id: ["Comment not found"],
      });
    }

    return res.json(comment);
  };

  list = async (req: Request, res: Response) => {
    const { eventId, page = 1, limit = 10 } = req.query;

    const filters: any = {};

    if (eventId) filters.eventId = Number(eventId);

    const comments = await this.prisma.comment.findMany({
      where: filters,
      skip: (Number(page) - 1) * Number(limit),
      take: Number(limit),
      include: {
        user: true,  
        event: true, 
      },
    });

    const totalComments = await this.prisma.comment.count({ where: filters });

    return res.json({
      total: totalComments,
      page: Number(page),
      limit: Number(limit),
      comments,
    });
  };

  update = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { content } = req.body;

    const comment = await this.prisma.comment.update({
      where: { id: Number(id) },
      data: {
        content,
      },
    });

    if (!comment) {
      throw new UnexpectedError("Failed to update comment");
    }

    return res.json({ comment, message: "Comment updated successfully" });
  };

  delete = async (req: Request, res: Response) => {
    const { id } = req.params;

    const comment = await this.prisma.comment.delete({
      where: { id: Number(id) },
    });

    if (!comment) {
      throw new UnexpectedError("Failed to delete comment");
    }

    return res.status(200).json({ message: "Comment deleted successfully" });
  };
}

export default CommentController;
