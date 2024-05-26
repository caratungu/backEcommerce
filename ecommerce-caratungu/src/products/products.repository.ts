import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './products.entity';
import { Repository } from 'typeorm';
import IProductDto from './productsDto';
// import { products } from 'src/dB/productsDB';
import { Category } from 'src/categories/categories.entity';

@Injectable()
export class ProductsRepository {
  constructor(
    @InjectRepository(Product) private productsRepository: Repository<Product>,
    @InjectRepository(Category) private readonly categoriesRepository: Repository<Category>,
  ) {}

  async getProducts(page: number, limit: number) {
    const start = (page - 1) * limit;
    const end = start + limit;
    const products = await this.productsRepository.find({
      relations: {
        category: true,
      },
    });
    if (start >= products.length) {
      return 'No se encontraron productos';
    }
    return products.slice(start, end);
  }

  async getProductById(id: string) {
    const product = await this.productsRepository.findOne({
      where: {
        id,
      },
    });
    if (product) {
      return product;
    } else {
      // return 'No existe producto con ese id';
    }
  }

  async createProduct(product: IProductDto) {
    const newProduct = await this.productsRepository.save(product);
    return { message: 'Producto creado', ...newProduct };
  }

  async updateProduct(uProduct: Product) {
    const productUpdate = await this.productsRepository.findOne({
      where: {
        id: uProduct.id,
      },
    });
    if (productUpdate) {
      productUpdate.name = uProduct.name;
      productUpdate.description = uProduct.description;
      productUpdate.price = uProduct.price;
      productUpdate.stock = uProduct.stock;
      productUpdate.imgUrl = uProduct.imgUrl;
      await this.productsRepository.save(productUpdate);
      return { message: 'Producto actualizado', id: productUpdate.id };
    } else {
      return 'No existe producto con ese ID';
    }
  }

  async deleteProduct(id: string) {
    const productDelete = await this.productsRepository.findOne({
      where: {
        id,
      },
    });
    if (productDelete) {
      await this.productsRepository.remove(productDelete);
      return 'Producto con id: ${id} eliminado';
    } else {
      return 'No existe producto con ese ID';
    }
  }

  async preloadProducts (products) {
    const productsInDB = await this.productsRepository.find();
    if (productsInDB.length === 0) {
      for (const product of products) {
        const category = await this.categoriesRepository.findOne({
          where: {
            name: product.category
          }
        })
        product.category = category.id;
        await this.productsRepository.save(product);
      }
      return 'Precarga de productos realizada';
    }
    return 'Ya existen productos en la BD'
  }
}
