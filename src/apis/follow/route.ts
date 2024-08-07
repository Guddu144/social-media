import { Router } from "express";
import FollowerController from "./controller";
import prisma from "../../prisma/prisma";
import checkSession from "../../middleware/check-session";

const router = Router();
const followerController = new FollowerController(prisma);

router.post("/", checkSession, followerController.follow);
router.delete("/:id", checkSession, followerController.unfollow);
router.get("/followers/:userId", followerController.getFollowers);
router.get("/following/:userId", followerController.getFollowing);

export default router;
