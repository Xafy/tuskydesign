import { NextFunction, Request, Response } from "express";
import {db} from "../../../common/models/index.js"

const Ticket = db.models.Ticket;

const delete_ticket = async (req: Request, res: Response, next: NextFunction) => {
  try {
        const ticket = await Ticket.findByPk(req.params.id);
        if (!ticket) {
          res.status(404).json({ error: 'Ticket not found' });
          return;
        }
    
        await ticket.destroy();
        res.json({ message: 'Ticket deleted successfully' });
        return;
      } catch (err) {
        res.status(500).json({ error: 'Failed to delete ticket', details: err });
        return;
      }
}

export default delete_ticket;