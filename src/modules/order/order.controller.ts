import  { Request, Response } from 'express';
import { OrderService } from './order.service';
import { AuthenticateRequest } from '../../middlewares/auth';


const orderService = new OrderService();

export class OrderController{

    async createOrder(req: AuthenticateRequest, res: Response){
        try{
            const userId = req.user.id;
            const createOrder = req.body.orderItems;
            const order = await orderService.createOrder(userId, createOrder);
            res.status(201).json(order);
        }catch(error: any){
            res.status(error.status).json({ message: error.message });
        }
    }

    async findOrderById(req: Request, res: Response){
        try{
            const orderId = req.params.id;
            const order = await orderService.findOrderById(orderId);
            res.status(200).json(order);
        }catch(error: any){
            res.status(error.status).json({ message: error.message });
        }
    }

    async findOrdersByUserId(req: AuthenticateRequest, res: Response){
        try{
            const {page, pageSize} = req.query;
            const userId = req.user.id;
            const orders = await orderService.findOrdersByUserId(userId, Number(page), Number(pageSize));
            res.status(200).json(orders);
        }catch(error: any){
            res.status(error.status).json({ message: error.message });
        }
    }


}