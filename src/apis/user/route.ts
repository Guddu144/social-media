import { Router } from "express";
import checkSession from "../../middleware/check-session";
import UserController from "./controller";
import prisma from "../../prisma/prisma";

const router = Router();
const user = new UserController(prisma);

router.post("/signup", user.signup);
router.post("/login", user.login);

// router.get("/", checkSession,fetchUsers);

export default router;
