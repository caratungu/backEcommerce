import { Injectable } from '@nestjs/common';
import { ProductsRepository } from './products.repository';
import { Product } from './products.entity';
import { CreateProductDto } from './dtos/CreateProduct.dto';

@Injectable()
export class ProductsService {
  constructor(private productsRespository: ProductsRepository) {}

  getProducts(page: number, limit: number) {
    return this.productsRespository.getProducts(page, limit);
  }

  getProductById(id: string) {
    return this.productsRespository.getProductById(id);
  }

  createProduct(product: CreateProductDto) {
    return this.productsRespository.createProduct(product);
  }

  updateProduct(uProduct: Product) {
    return this.productsRespository.updateProduct(uProduct);
  }

  deleteProduct(id: string) {
    return this.productsRespository.deleteProduct(id);
  }

  preloadProducts(products: CreateProductDto[]) {
    return this.productsRespository.preloadProducts(products);
  }
}
