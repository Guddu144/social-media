import { Router } from "express";
import CommentController from "./controller";
import prisma from "../../prisma/prisma";
import checkSession from "../../middleware/check-session";

const router = Router();
const commentController = new CommentController(prisma);

router.post("/", checkSession, commentController.create);
router.get("/:id",checkSession, commentController.getOne);
router.get("/", checkSession, commentController.list);
router.put("/:id", checkSession, commentController.update);
router.delete("/:id", checkSession, commentController.delete);


export default router;
