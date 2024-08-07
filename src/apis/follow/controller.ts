import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { UnexpectedError, ValidationFailedError } from "../../utils/errors";
import { AuthenticatedRequest } from "../../middleware/check-session";

class FollowerController {
  constructor(private prisma: PrismaClient) {}

  follow = async (req: AuthenticatedRequest, res: Response) => {
    const { followingId } = req.body;
    const followerId = req.user?.userId;
  
    if (followerId == followingId) {
      return res.status(400).json({ message: "You cannot follow yourself" });
    }
  
    const existingFollower = await this.prisma.follower.findFirst({
      where: {
        followerId,
        followingId: Number(followingId),
      },
    });
  
    if (existingFollower) {
      return res.status(400).json({ message: "You are already following this user" });
    }
  
    const follower = await this.prisma.follower.create({
      data: {
        followerId,
        followingId: Number(followingId),
      },
    });
  
    return res.status(201).json({ follower, message: "Successfully followed the user" });
  };
  
  unfollow = async (req: AuthenticatedRequest, res: Response) => {
    const { id } = req.params;
    const followerId = req.user?.userId;

    const existRelation = await this.prisma.follower.findFirst({
        where: {
          followerId,
          followingId: Number(id),
        },
      });

    if (!existRelation) {
        return res.status(400).json({ message: "You are not following this user yet" });
      }

    const follower = await this.prisma.follower.delete({
      where: { id: Number(existRelation.id) },
    });

    if (!follower) {
      throw new UnexpectedError("Failed to unfollow user");
    }

    return res.status(200).json({ message: "Unfollowed user successfully" });
  };

  getFollowers = async (req: Request, res: Response) => {
    const { userId } = req.params;

    const followers = await this.prisma.follower.findMany({
      where: { followingId: Number(userId) },
      include: {
        follower: true, 
      },
    });

    if (!followers.length) {
      return res.status(404).json({ message: "No followers found" });
    }

    return res.json(followers);
  };

  getFollowing = async (req: Request, res: Response) => {
    const { userId } = req.params;

    const following = await this.prisma.follower.findMany({
      where: { followerId: Number(userId) },
      include: {
        following: true, 
      },
    });

    if (!following.length) {
      return res.status(404).json({ message: "Not following anyone" });
    }

    return res.json(following);
  };
}

export default FollowerController;
