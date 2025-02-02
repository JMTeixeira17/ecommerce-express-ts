import prisma from '../../db/prisma';
import { Order } from './order.entity';

export class OrderRepository{

    async createOrder(userId: string, orderItems: {productId: string, quantity: number, subtotal: number}[], total: number){
        const order = await prisma.order.create({
            data: {
                userId,
                total,
                status: 'PENDING'
            },
        });

        await Promise.all(orderItems.map(item =>
            prisma.orderItem.create({
                data: {
                    orderId: order.id,
                    productId: item.productId,
                    quantity: item.quantity,
                    subtotal: item.subtotal
                }
            })
        ));

        const orderWithItems = await prisma.order.findUnique({
            where: {
                id: order.id,
            },
            include: {
                items: {
                    include: {
                        product: {
                            select: {
                                name: true,
                            }
                        }
                    }
                }
            },
        });

        return orderWithItems;
    }

    async findOrderById(id: string){
        return await prisma.order.findUnique({
            where: {
                id: id,
              },
              include: {
                items: {
                  include: {
                    product: {
                      select: {
                        name: true,
                      },
                    },
                  },
                },
              },
        });
    }

    async findOrdersByUserId(userId: string, page: number, pageSize: number){
        return await prisma.order.findMany({
          where: {
            userId: userId,
          },
          skip: (page - 1) * pageSize,
          take: pageSize,
          include: {
            items: {
              include: {
                product: {
                  select: {
                    name: true,
                  },
                },
              },
            },
          },
        });
      }








}