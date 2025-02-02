export interface OrderItem {
    id?: string;
    orderId?: string;
    productId: string;
    quantity: number;
    subtotal: number;
    createdAt?: Date;
    updatedAt?: Date;
}