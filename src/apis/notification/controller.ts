import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { AuthenticatedRequest } from "../../middleware/check-session";
import { UnexpectedError } from "../../utils/errors";

class NotificationController {
  constructor(private prisma: PrismaClient) {}

  getNotifications = async (req: AuthenticatedRequest, res: Response) => {
    const userId = req.user?.userId;

    const notifications = await this.prisma.notification.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });

    if (!notifications) {
      throw new UnexpectedError("Failed to get notifications");
    }

    return res.json(notifications);
  };

  markAsRead = async (req: AuthenticatedRequest, res: Response) => {
    const { id } = req.params;

    const notification = await this.prisma.notification.update({
      where: { id: Number(id) },
      data: { read: true },
    });

    if (!notification) {
      throw new UnexpectedError("Failed to mark notification as read");
    }

    return res.json({ notification, message: "Notification marked as read" });
  };
}

export default NotificationController;
