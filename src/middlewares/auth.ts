import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/jwt';
import { TokenExpiredError } from 'jsonwebtoken';

export interface AuthenticateRequest extends Request {
    user?: any;
}


export function authenticate(req: AuthenticateRequest, res: Response, next: NextFunction): any {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ message: 'Authorization header is required' });
    }
    const token = authHeader.split(' ')[1];
    try{
        const user = verifyToken(token);
        if (!user) {
            return res.status(401).json({ message: 'Invalid token' });
        }
        (req as any).user = user;
        next();
    }catch(err){
        if(err instanceof TokenExpiredError){
            return res.status(401).json({ message: 'Token expired' });
        }
        return res.status(401).json({ message: 'Invalid token' });

    }

}