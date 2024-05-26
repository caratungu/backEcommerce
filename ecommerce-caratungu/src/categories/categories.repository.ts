import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './categories.entity';
import { Repository } from 'typeorm';
import ICategoryDto from './categoriesDto';

@Injectable()
export class CategoriesRepository {
  constructor(
    @InjectRepository(Category)
    private categoriesRepository: Repository<Category>,
  ) {}

  async getCategories() {
    return await this.categoriesRepository.find();
  }

  async addCategory(category: ICategoryDto) {
    await this.categoriesRepository.save(category);
    return 'Categoría creada';
  }

  async preloadCategories(categories) {
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
