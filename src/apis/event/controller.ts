import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { UnexpectedError, ValidationFailedError } from "../../utils/errors";
import { AuthenticatedRequest } from "../../middleware/check-session";

class EventController {
  constructor(private prisma: PrismaClient) {}

  create = async (req: AuthenticatedRequest, res: Response) => {
    const { title, description, date, time, location, image, category } = req.body;
    const userId = req.user?.userId; 

    const event = await this.prisma.event.create({
      data: {
        title,
        description,
        date: new Date(date),
        time,
        location,
        image,
        category,
        userId,
      },
    });

    if (!event) {
      throw new UnexpectedError("Failed to create event");
    }

    return res.status(201).json({ event, message: "Event created successfully" });
  };

  // Get event by ID
  getOne = async (req: Request, res: Response) => {
    const { id } = req.params;

    const event = await this.prisma.event.findUnique({
      where: { id: Number(id) },
    });

    if (!event) {
      throw new ValidationFailedError("Event not found", {
        id: ["Event not found"],
      });
    }

    return res.json(event);
  };

  // Get list of events with filtering, pagination, etc.
  list = async (req: Request, res: Response) => {
    const { category, date, page = 1, limit = 10 } = req.query;

    const filters: any = {};

    if (category) filters.category = String(category);
    if (date) filters.date = new Date(String(date));

    const events = await this.prisma.event.findMany({
      where: filters,
      skip: (Number(page) - 1) * Number(limit),
      take: Number(limit),
    });

    const totalEvents = await this.prisma.event.count({ where: filters });

    return res.json({
      total: totalEvents,
      page: Number(page),
      limit: Number(limit),
      events,
    });
  };

  // Update an event
  update = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { title, description, date, time, location, image, category } = req.body;

    const event = await this.prisma.event.update({
      where: { id: Number(id) },
      data: {
        title,
        description,
        date: new Date(date),
        time,
        location,
        image,
        category,
      },
    });

    if (!event) {
      throw new UnexpectedError("Failed to update event");
    }

    return res.json({ event, message: "Event updated successfully" });
  };

  // Delete an event
  delete = async (req: Request, res: Response) => {
    const { id } = req.params;

    const event = await this.prisma.event.delete({
      where: { id: Number(id) },
    });

    if (!event) {
      throw new UnexpectedError("Failed to delete event");
    }

    return res.status(200).json({ message: "Event deleted successfully" });
  };
}

export default EventController;
