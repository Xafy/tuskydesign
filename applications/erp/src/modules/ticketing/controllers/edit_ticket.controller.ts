import { NextFunction, Request, Response } from "express";
import {db} from "../../../common/models/index.js"

const Ticket = db.models.Ticket;

const edit_ticket = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const ticket = await Ticket.findByPk(req.params.id);
        if (!ticket) {
            res.status(404).json({ error: 'Ticket not found' });
            return;
        }

        await ticket.update(req.body);
        res.json(ticket);
        return;
    } catch (err) {
        res.status(500).json({ error: 'Failed to update ticket', details: err });
        return;
    }
}

export default edit_ticket;