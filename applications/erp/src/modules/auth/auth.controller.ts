import { NextFunction, Request, Response } from 'express';
import { login, register } from './auth.service.js';

const loginController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body;
        const { user, token } = await login(email, password);
        res.json({ user, token });
      } catch (err: any) {
        res.status(401).json({ message: err.message });
      }
}

const registerController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { user, token } = await register(req.body);
        res.status(201).json({ user, token });
      } catch (err: any) {
        res.status(400).json({ message: err.message });
      }
}

export {loginController, registerController}