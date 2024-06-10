import {
  BadRequestException,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/products.entity';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dtos/CreateProduct.dto';
import { CategoriesService } from '../categories/categories.service';

@Injectable()
export class ProductsRepository {
  constructor(
    @InjectRepository(Product) private productsRepository: Repository<Product>,
    private readonly categoriesService: CategoriesService,
  ) {}

  async getProducts(page: number, limit: number): Promise<Product[]> {
    const start = (page - 1) * limit;
    const end = start + limit;
    const products = await this.productsRepository.find({
      relations: {
        category: true,
      },
    });
    if (start >= products.length) {
      throw new BadRequestException(`No se encontraron productos en la página ${page}`);
    }
    return products.slice(start, end);
  }

  async getProductById(id: string): Promise<Product> {
    const product = await this.productsRepository.findOne({
      where: {
        id,
      },
    });
    if (product) {
      return product;
    } else {
      throw new BadRequestException('No existe producto con ese id');
    }
  }

  async createProduct(
    product: CreateProductDto,
  ): Promise<{ message: string; product: Product }> {
    const productNameExist = await this.productsRepository
      .createQueryBuilder('product')
      .withDeleted()
      .where('product.name = :name', { name: product.name })
      .getOne();

    if (!productNameExist) {
      const category = await this.categoriesService.getCategoryByName(
        product.category,
      );
      if (!category)
        throw new BadRequestException('Nombre de categoría inválido');
      product.category = category.id;
      const newProduct = await this.productsRepository.save(product);
      return { message: 'Producto creado', product: newProduct };
    } else {
      throw new BadRequestException('Ya existe un producto con ese nombre');
    }
  }

  async updateProduct(uProduct: Product): Promise<{ message: string; id: string }> {
    const productUpdate = await this.productsRepository.findOne({
      where: {
        id: uProduct.id,
      },
    });
    const productNameExist = await this.productsRepository
      .createQueryBuilder('product')
      .withDeleted()
      .where('product.name = :name', { name: uProduct.name })
      .getOne();

    if (productNameExist && uProduct.id !== productNameExist.id) throw new BadRequestException('El nombre de producto esta asociado a un ID diferente');
    
    if (productUpdate) {
      productUpdate.name = uProduct.name;
      productUpdate.description = uProduct.description;
      productUpdate.price = uProduct.price;
      productUpdate.stock = uProduct.stock;
      productUpdate.imgUrl = uProduct.imgUrl;
      await this.productsRepository.save(productUpdate);
      return { message: 'Producto actualizado', id: productUpdate.id };
    } else {
      throw new BadRequestException('No existe producto con ese ID');
    }
  }

  async deleteProduct(id: string): Promise<string> {
    const productDelete = await this.productsRepository.findOne({
      where: {
        id,
      },
    });
    if (productDelete) {
      await this.productsRepository.softDelete(productDelete.id);
      return `Producto con id: ${id} eliminado`;
    } else {
      throw new BadRequestException('No existe producto con ese ID');
    }
  }

  async preloadProducts(products: CreateProductDto[]): Promise<string> {
    const productsInDB = await this.productsRepository.find();
    if (productsInDB.length === 0) {
      for (const product of products) {
        const category = await this.categoriesService.getCategoryByName(
          product.category,
        );
        product.category = category.id;
        await this.productsRepository.save(product);
      }
      return 'Precarga de productos realizada';
    }
    return 'Ya existen productos en la BD';
  }
}
