import { Order } from "./order.entity";
import { OrderItem } from "./order-item.entity";
import { OrderRepository } from "./order.repository";
import createError from "http-errors";
import { ProductRepository } from "../products/product.repository";
import { UserRepository } from "../user/user.repository";
import prisma from "../../db/prisma";

const productRepository = new ProductRepository();
const userRepository = new UserRepository();
const orderRepository = new OrderRepository();


export class OrderService {

    async createOrder(userId: string, items: { productId: string, quantity: number }[]) {
        const transactionResult = await prisma.$transaction(async (prisma) => {
            try {
                const user = await userRepository.findUserById(userId);
                if (!user) {
                    throw createError(404, "User not found");
                }
                const productIds = items.map(item => item.productId);
                const products = await productRepository.findProductsByIds(productIds);
                if (products.length !== productIds.length) {
                    throw createError(404, "One or more products do not exist.");
                }
                let total = 0;
                const orderItems: { productId: string, quantity: number, subtotal: number }[] = items.map(item => {
                    const product = products.find(p => p.id === item.productId);
                    if (!product) throw createError(404, "Product not found");
                    if (product.quantity < item.quantity) {
                        throw createError(400, `Product: ${product?.name} is out of stock`);
                    }
                    total += product.price * item.quantity;
                    let subtotal = product.price * item.quantity;
                    return {
                        productId: item.productId,
                        quantity: item.quantity,
                        subtotal: subtotal
                    };
                });
                const newOrder = await orderRepository.createOrder(user.id, orderItems, total);

                for (const item of orderItems) {
                    await productRepository.updateProductQuantity(item.productId, item.quantity);
                }
                return newOrder;
            } catch (error) {
                throw error;
            }
        });

        return transactionResult;
    }

    async findOrdersByUserId(userId: string, page: number, pageSize: number){
        try{

            if (isNaN(page) || isNaN(pageSize) || !Number.isInteger(page) || !Number.isInteger(pageSize) || page < 1 || pageSize < 1) {
                throw createError(400, "Invalid page or pageSize. Must be positive integers.");
            }

            const user = await userRepository.findUserById(userId);
            if(!user){
                throw createError(404, "User not found");
            }
            const orders = await orderRepository.findOrdersByUserId(user.id, page, pageSize);
            return orders;
        }catch(error){
            return error;
        }
    }

    async findOrderById(orderId: string){
        try{
            const order = await orderRepository.findOrderById(orderId);
            if(!order){
                throw createError(404, "Order not found");
            }
            return order;
        }catch(error){
            return error;
        }
    }

}
