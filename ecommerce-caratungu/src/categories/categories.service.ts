import { Injectable } from '@nestjs/common';
import { CategoriesRepository } from './categories.repository';
import { CreateCategoryDto } from './dtos/CreateCategory.dto';

@Injectable()
export class CategoriesService {
  constructor(private readonly categoriesRepository: CategoriesRepository) {}

  getCategories() {
    return this.categoriesRepository.getCategories();
  }

  addCategory(category: CreateCategoryDto) {
    return this.categoriesRepository.addCategory(category);
  }

  preloadCategories(categories) {
    return this.categoriesRepository.preloadCategories(categories);
  }
}
