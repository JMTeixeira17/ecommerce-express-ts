import { OrderItem } from "./order-item.entity";

export interface Order {
    id: string;
    total: number;
    status: string;
    userId: string;
    orderItems: OrderItem[];
    createdAt: Date;
    updatedAt: Date;
}