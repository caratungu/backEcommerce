import { Injectable } from '@nestjs/common';
import { CategoriesRepository } from './categories.repository';
import ICategoryDto from './categoriesDto';

@Injectable()
export class CategoriesService {
  constructor(private readonly categoriesRepository: CategoriesRepository) {}

  getCategories() {
    return this.categoriesRepository.getCategories();
  }

  addCategory(category: ICategoryDto) {
    return this.categoriesRepository.addCategory(category);
  }

  preloadCategories(categories) {
    return this.categoriesRepository.preloadCategories(categories);
  }
}
