import { Router } from "express";
import NotificationController from "./controller";
import checkSession from "../../middleware/check-session";
import prisma from "../../prisma/prisma";

const router = Router();
const notification = new NotificationController(prisma);

router.get("/", checkSession, notification.getNotifications);
router.patch("/:id/read", checkSession, notification.markAsRead);

export default router;
