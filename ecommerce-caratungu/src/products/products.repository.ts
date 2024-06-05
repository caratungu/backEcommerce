import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './products.entity';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dtos/CreateProduct.dto';
import { Category } from '../categories/categories.entity';

@Injectable()
export class ProductsRepository {
  constructor(
    @InjectRepository(Product) private productsRepository: Repository<Product>,
    @InjectRepository(Category)
    private readonly categoriesRepository: Repository<Category>,
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
      throw new HttpException(`No se encontraron productos en la página ${page}`, HttpStatus.BAD_REQUEST);
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
      throw new HttpException('No existe producto con ese id', HttpStatus.BAD_REQUEST);
    }
  }

  async createProduct(product: CreateProductDto) {
    const productNameExist = await this.productsRepository.findOne({
      where: {
        name: product.name
      }
    });
    if (!productNameExist) {
      const category = await this.categoriesRepository.findOne({
        where: {
          name: product.category,
        },
      });
      product.category = category.id;
      const newProduct = await this.productsRepository.save(product);
      return { message: 'Producto creado', ...newProduct };
    } else {
      throw new HttpException('Ya existe un producto con ese nombre', HttpStatus.BAD_REQUEST)
    }
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
      throw new HttpException('No existe producto con ese ID', HttpStatus.BAD_REQUEST);
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
      return `Producto con id: ${id} eliminado`;
    } else {
      throw new HttpException('No existe producto con ese ID', HttpStatus.BAD_REQUEST);
    }
  }

  async preloadProducts(products: CreateProductDto[]) {
    const productsInDB = await this.productsRepository.find();
    if (productsInDB.length === 0) {
      for (const product of products) {
        const category = await this.categoriesRepository.findOne({
          where: {
            name: product.category,
          },
        });
        product.category = category.id;
        await this.productsRepository.save(product);
      }
      return 'Precarga de productos realizada';
    }
    return 'Ya existen productos en la BD';
  }
}
