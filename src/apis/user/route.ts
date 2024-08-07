import { Router } from "express";
import checkSession from "../../middleware/check-session";
import UserController from "./controller";
import prisma from "../../prisma/prisma";

const router = Router();
const user = new UserController(prisma);

router.post("/signup", user.signup);
router.post("/login", user.login);
router.get("/get-events", checkSession, user.getFollowingEvents
    /* #swagger.security = [{
            "bearerAuth": []
    }] */
); 

export default router;
