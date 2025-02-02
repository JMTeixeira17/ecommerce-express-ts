
import { Request, Response, NextFunction } from 'express';

export function validateJsonFormat(err: SyntaxError, req: Request, res: Response, next: NextFunction): any {
    if (err instanceof SyntaxError) {
      return res.status(400).json({ message: 'JSON format invalid. Please review' });
    }
    next(err);
  }