import { NextFunction, Request, Response } from "express";
import {db} from "../../../common/models/index.js"

const Ticket = db.models.Ticket;
const User = db.models.User;

const get_tickets = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const tickets = await Ticket.findAll({
          include: [
            { model: User, as: 'creator', attributes: ['id', 'username', 'fullname'] },
            { model: User, as: 'assignee', attributes: ['id', 'username', 'fullname'] },
          ],
        });
    
        res.json(tickets);
      } catch (err) {
        res.status(500).json({ error: 'Failed to fetch tickets', details: err });
      }
}

export default get_tickets;