import prisma from '../../db/prisma';
import { User } from './user.entity';

export class UserRepository{
    async createUser(user: User){
        return await prisma.user.create({
            data: user
        });
    }
    async findUserByEmailOrUsername(email: string, username: string) {
        return await prisma.user.findFirst({
            where: {
                OR: [
                    { email: email },
                    { username: username }
                ]
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