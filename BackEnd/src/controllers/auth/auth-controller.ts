import { NextFunction, Request, Response } from 'express';

import { AuthService } from '../../services/auth/auth-service.js';
import { User } from '../../entities/User.js';

export class AuthController {
  static async signUp(req: Request, res: Response, next: NextFunction) {
    try {
      const { username, email, password, retypePassword } = req.body;
      const result: User = await AuthService.signUp({
        username,
        email,
        password,
        retypePassword
      });

      res
        .status(201)
        .json({ message: 'User created successfully', data: result });
    } catch (error: any) {
      next(error);
    }
  }
}
