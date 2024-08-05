import { Router } from "express";
import EventController from "./controller";
import prisma from "../../prisma/prisma";
import checkSession from "../../middleware/check-session";

const router = Router();
const event = new EventController(prisma);


router.post(
    "/create",checkSession,event.create);
  router.get("/getOne/:id",checkSession, event.getOne);
  router.get("/list",checkSession,event.list);
  router.put("/update/:id",checkSession,event.update);
  router.delete("/delete/:id",checkSession,event.delete);

export default router;
