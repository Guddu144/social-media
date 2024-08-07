import { Router } from "express";
import LikeController from "./controller";
import prisma from "../../prisma/prisma";
import checkSession from "../../middleware/check-session";

const router = Router();
const likeController = new LikeController(prisma);

router.post("/", checkSession, likeController.create);
router.get("/", likeController.list);

export default router;
