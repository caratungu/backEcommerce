import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/categories.entity';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from './dtos/CreateCategory.dto';

@Injectable()
export class CategoriesRepository {
  constructor(
    @InjectRepository(Category)
    private categoriesRepository: Repository<Category>,
  ) {}

  async getCategories(): Promise<Category[]> {
    try {
      return await this.categoriesRepository.find();
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }
  
  async getCategoryByName(category: string): Promise<Category> {
    try {
      return await this.categoriesRepository.findOne({
        where: {
          name: category
        }
      });
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }
  
  async addCategory(category: CreateCategoryDto): Promise<string> {
    try {
      await this.categoriesRepository.save(category);
      return 'Categoría creada';
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async preloadCategories(categories: { name: string }[]): Promise<string> {
    const cats = await this.categoriesRepository.find();
    if (cats.length === 0) {
      for (const category of categories) {
        await this.categoriesRepository.save(category);
      }
      return 'Precarga de categorías realizada';
    }
    return 'Ya existen categorías en la BD';
  }
}
