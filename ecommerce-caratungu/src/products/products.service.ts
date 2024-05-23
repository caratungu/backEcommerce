import { Injectable } from '@nestjs/common';
import { ProductsRepository } from './products.repository';
import { Product } from './product.interface';

@Injectable()
export class ProductsService {
  constructor(private productsRespository: ProductsRepository) {}

  getProducts(page: number, limit: number) {
    return this.productsRespository.getProducts(page, limit);
  }

  getProductById(id: number) {
    return this.productsRespository.getProductById(id);
  }

  createProduct(product: Omit<Product, 'id'>) {
    return this.productsRespository.createProduct(product);
  }

  updateProduct(id: number, product: Omit<Product, 'id'>) {
    return this.productsRespository.updateProduct(id, product);
  }

  deleteProduct(id: number) {
    return this.productsRespository.deleteProduct(id);
  }
}
