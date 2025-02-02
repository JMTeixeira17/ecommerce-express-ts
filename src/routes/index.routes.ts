import { Router } from 'express';
import userRouter from '../modules/user/user.routes'
import productRouter from '../modules/products/product.routes';
import orderRouter from '../modules/order/order.routes';

const routerIndex = Router();

routerIndex.use('/users', userRouter);
routerIndex.use('/products', productRouter);
routerIndex.use('/orders', orderRouter);

export default routerIndex;