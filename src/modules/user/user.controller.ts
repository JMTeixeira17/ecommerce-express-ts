import { Request, Response } from 'express';
import { UserService } from './user.service';
import { AuthenticateRequest } from '../../middlewares/auth';

const userService = new UserService();

export class UserController{

    async register(req: AuthenticateRequest, res: Response){
        try{
            const createUser = req.body;
            const user = await userService.registerUser(createUser);
            res.status(201).json(user);
        }catch(error: any){
            res.status(error.status).json({ message: error.message });
        }
    }

    async login(req: AuthenticateRequest, res: Response){
        try{
            const { username, password } = req.body;
            const token = await userService.login(username, password);
            res.status(200).json({ token });
        }catch(error: any){
            res.status(error.status).json({ message: error.message });
        }
    }



}