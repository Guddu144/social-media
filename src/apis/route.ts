import { Router } from "express";
import EventsRouter from "./event/route"
import CommentRouter from "./comment/route"
import LikeRouter from "./like/route"
import FollowRouter from "./follow/route"
import UserRouter from "./user/route"
import NotificationRouter from "./notification/route"


const router = Router();

router.use('/user',UserRouter
      // #swagger.tags = ['User']
)
router.use('/events',EventsRouter
    // #swagger.tags = ['Events']
   /* #swagger.security = [{
            "bearerAuth": []
    }] */
)
router.use('/comment',CommentRouter
    // #swagger.tags = ['Comment']
   /* #swagger.security = [{
            "bearerAuth": []
    }] */
)

router.use('/like',LikeRouter
    // #swagger.tags = ['Like']
   /* #swagger.security = [{
            "bearerAuth": []
    }] */
)


router.use('/follow',FollowRouter
    // #swagger.tags = ['Follow']
   /* #swagger.security = [{
            "bearerAuth": []
    }] */
)

router.use('/notification',NotificationRouter
    // #swagger.tags = ['Notification']
   /* #swagger.security = [{
            "bearerAuth": []
    }] */
)


export default router;
