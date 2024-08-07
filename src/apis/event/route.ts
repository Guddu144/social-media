import { Router } from "express";
import EventController from "./controller";
import prisma from "../../prisma/prisma";
import checkSession from "../../middleware/check-session";

const router = Router();
const event = new EventController(prisma);


router.post(
    "/create",checkSession,event.create);
  router.get("/:id",checkSession, event.getOne);
  router.get("/",checkSession,event.list);
  router.put("/:id",checkSession,event.update);
  router.delete("/:id",checkSession,event.delete);

export default router;
