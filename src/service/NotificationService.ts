import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class NotificationService {
  static async createNotification(userId: number, type: string, content: string) {
    await prisma.notification.create({
      data: {
        userId,
        type,
        content,
      },
    });
  }
}

export default NotificationService;
