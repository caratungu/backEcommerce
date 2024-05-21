import { Injectable } from '@nestjs/common';
import { ProductsRepository } from './products.repository';

@Injectable()
export class ProductsService {
  constructor(private productsRespository: ProductsRepository) {}

  getProducts() {
    return this.productsRespository.getProducts();
  }
}
