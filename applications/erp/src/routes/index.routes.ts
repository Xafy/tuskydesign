import { Router } from "express";
import ticketingRouter from "../modules/ticketing/ticketing.routes.js";
import authRouter from "src/modules/auth/auth.routes.js";

const indexRouter = Router();

indexRouter.use(ticketingRouter);
indexRouter.use(authRouter);

export default indexRouter;