import { Request, Response } from 'express';
import { ProductService } from './product.service';
import { AuthenticateRequest } from '../../middlewares/auth';

const productService = new ProductService();

export class ProductController{


    async createProduct(req: AuthenticateRequest, res: Response){
        try{
            const createProduct = req.body;
            const product = await productService.createProduct(createProduct);
            res.status(201).json(product);
        }catch(error: any){
            res.status(error.status).json({ message: error.message });
        }
    }

    async getProductById(req: AuthenticateRequest, res: Response){
        try{
            const { id } = req.params;
            const product = await productService.findProductById(id);
            res.status(200).json(product);
        }catch(error: any){
            res.status(error.status).json({ message: error.message });
        }
    }

    async getAllProducts(req: AuthenticateRequest, res: Response){
        try{
            const { page, pageSize } = req.query;
            const products = await productService.findAllProducts(Number(page), Number(pageSize));
            res.status(200).json(products);
        }catch(error: any){
            res.status(error.status).json({ message: error.message });
        }
    }

    async updateProduct(req: AuthenticateRequest, res: Response){
        try{
            const { id } = req.params;
            const updateProduct = req.body;
            const product = await productService.updateProduct(id, updateProduct);
            res.status(200).json(product);
        }catch(error: any){
            res.status(error.status).json({ message: error.message });
        }
    }

    async deleteProduct(req: AuthenticateRequest, res: Response){
        try{
            const { id } = req.params;
            await productService.deleteProduct(id);
            res.status(204).json({ message: 'Product deleted successfully' });
        }catch(error: any){
            res.status(error.status).json({ message: error.message });
        }
    }

}