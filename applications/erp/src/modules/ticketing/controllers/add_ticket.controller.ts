import { NextFunction, Request, Response } from "express";
import { db } from "../../../common/models/index.js";

const Ticket = db.models.Ticket;

const add_ticket = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { title, description, priority, createdBy, assignedTo } = req.body;

        console.log(req.body)
    
        const ticket = await Ticket.create({
          title,
          description,
          priority,
          createdBy,
          assignedTo: assignedTo || null,
        });
    
        res.status(201).json(ticket);
      } catch (err) {
        res.status(500).json({ error: 'Failed to create ticket', details: err });
      }
}

export default add_ticket;