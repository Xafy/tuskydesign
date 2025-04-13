import add_ticket from "./controllers/add_ticket.controller.js";
import delete_ticket from "./controllers/delete_ticket.controller.js";
import edit_ticket from "./controllers/edit_ticket.controller.js";
import get_tickets from "./controllers/get_tickets.controller.js";


import { Router } from "express";

const ticketingRouter =  Router();

ticketingRouter.post('/ticketing/add_ticket', add_ticket)
ticketingRouter.post('/ticketing/edit_ticket', edit_ticket)
ticketingRouter.post('/ticketing/delete_ticket', delete_ticket)
ticketingRouter.post('/ticketing/get_tickets', get_tickets)

export default ticketingRouter;