import prisma from '../../db/prisma';
import { User } from './user.entity';

export class UserRepository{
    async createUser(user: User){
        return await prisma.user.create({
            data: user
        });
    }
    async findUserByEmail(email: string){
        return await prisma.user.findUnique({
            where:{
                email
            }
        });
    }
    async findUserByUsername(username: string){
        return await prisma.user.findUnique({
            where:{
                username
            }
        });
    }
    async findUserById(id: string){
        return await prisma.user.findUnique({
            where:{
                id
            }
        });
    }
}