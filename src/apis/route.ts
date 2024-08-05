import { Router } from "express";
import EmployeerRouter from "./employeer/index"
import EventsRouter from "./event/route"


import UserRouter from "./user/route"
import checkSession from "../middleware/check-session";

const router = Router();

router.use('/user',UserRouter)
router.use('/events',EventsRouter)
router.use('/employeer',EmployeerRouter)


export default router;
