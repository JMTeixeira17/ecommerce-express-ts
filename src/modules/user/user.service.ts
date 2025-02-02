import { User } from "./user.entity";
import { UserRepository } from "./user.repository";
import createError from "http-errors";
import { generateToken } from "../../utils/jwt";
import bcrypt from "bcrypt";

const  userRepository = new UserRepository();

export class UserService{

    async registerUser(createUser: User){
        try{
            const user = await userRepository.findUserByEmail(createUser.email);
            if(user){
                if(user.email === createUser.email){
                    throw createError(409, "Email already exists");
                }
                if(user.username === createUser.username){
                    throw createError(409, "Username already exists");
                }
            }
            createUser.password = await bcrypt.hash(createUser.password, 10);
            const newUser = await userRepository.createUser(createUser);
            return newUser;
        }catch(error){
            return error;
        }
    }

    async login(username: string, password: string){
        try{
            const user = await userRepository.findUserByUsername(username);
            if(!user){
                throw createError(404, "User not found");
            }

            const validPassword = await bcrypt.compare(password, user.password);
            if(!validPassword){
                throw createError(401, "Invalid password");
            }
            const token = generateToken({id: user.id, username: user.username, name: user.name, surname:user.surname});
            return token;
        }catch(error){
            return error;
        }
    }




}