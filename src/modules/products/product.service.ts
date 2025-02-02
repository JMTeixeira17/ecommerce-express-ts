import { Product } from './product.entity';
import { ProductRepository } from './product.repository';
import createError from "http-errors";

const productRepository = new ProductRepository();

export class ProductService{


    async createProduct(createProduct: Product){
        try{
            const product = await productRepository.findProductByName(createProduct.name);
            if(product){
                throw createError(409, "Product already exists");
            }
            const newProduct = await productRepository.createProduct(createProduct);
            return newProduct;
        }catch(error){
            return error;
        }
    }

    async findProductById(id: string){
        try{
            const product = await productRepository.findProductById(id);
            if(!product){
                throw createError(404, "Product not found");
            }
            return product;
        }catch(error){
            return error;
        }
    }

    async findAllProducts(page: number, pageSize: number){
        try{

            if (isNaN(page) || isNaN(pageSize) || !Number.isInteger(page) || !Number.isInteger(pageSize) || page < 1 || pageSize < 1) {
                throw createError(400, "Invalid page or pageSize. Must be positive integers.");
            }

            const products = await productRepository.findAllProducts(page, pageSize);
            if(products.length === 0){
                throw createError(404, "Products not found");
            }
            return products;
        }catch(error){
            return error;
        }
    }

    async updateProduct(id: string, product: Product){
        try{
            const updatedProduct = await productRepository.updateProduct(id, product);
            return updatedProduct;
        }catch(error){
            return error;
        }
    }

    async deleteProduct(id: string): Promise<void>{
        try{
            const product = await productRepository.findOrderItemsByProductId(id);
            if(!product){
                throw createError(404, "Product not found");
            }

            if (product.length > 0) {
                throw createError(400, "Cannot delete product because it is associated with an order.");
            }

            const deletedProduct = await productRepository.deleteProduct(id);
        }catch(error){
            if (error instanceof Error) {
                throw createError(500, error.message);
            } else {
                throw createError(500, "An unknown error occurred");
            }
        }
    }

}