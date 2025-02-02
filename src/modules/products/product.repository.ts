import prisma from '../../db/prisma';
import { Product } from './product.entity';

export class ProductRepository{
    async createProduct(product: Product){
        return await prisma.product.create({
            data: product
        });
    }

    async findProductById(id: string){
        return await prisma.product.findUnique({
            where:{
                id
            }
        });
    }

    async findProductByName(name: string){
        return await prisma.product.findFirst({
            where:{
                name
            }
        });
    }

    async findAllProducts(page:number, pageSize:number){
        return await prisma.product.findMany({
            skip: (page - 1) * pageSize,
            take: pageSize,
        });
    }

    async updateProduct(id: string, product: Product){
        return await prisma.product.update({
            where:{
                id
            },
            data: product
        });
    }

    async deleteProduct(id: string){
        return await prisma.product.delete({
            where:{
                id
            }
        });
    }

    async findProductsByIds(productIds: string[]){
        return await prisma.product.findMany({
            where:{
                id: {
                    in: productIds
                }
            }
        });
    }

    async updateProductQuantity(id: string, quantity: number){
        return await prisma.product.update({
            where:{
                id
            },
            data:{
                quantity: {
                    decrement: quantity
                }
            }
        });
    }

    async findOrderItemsByProductId(productId: string) {
        const orderItems = await prisma.orderItem.findMany({
            where: {
                productId,
            },
        });
        return orderItems;
    }


}