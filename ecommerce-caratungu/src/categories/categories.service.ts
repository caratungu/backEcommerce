import { Injectable } from '@nestjs/common';
import { CategoriesRepository } from './categories.repository';
import { CreateCategoryDto } from './dtos/CreateCategory.dto';

@Injectable()
export class CategoriesService {
  constructor(private readonly categoriesRepository: CategoriesRepository) {}

  getCategories() {
    return this.categoriesRepository.getCategories();
  }
  
  getCategoryByName(category: string) {
    return this.categoriesRepository.getCategoryByName(category);
  }

  addCategory(category: CreateCategoryDto) {
    return this.categoriesRepository.addCategory(category);
  }

  preloadCategories(categories) {
    return this.categoriesRepository.preloadCategories(categories);
  }
}
