import { Injectable } from '@nestjs/common';
import { CategoriesRepository } from './categories.repository';

@Injectable()
export class CategoriesService {
  constructor(private readonly categoriesRepository: CategoriesRepository) {}

  getCategories() {
    return this.categoriesRepository.getCategories();
  }
  
  getCategoryByName(category: string) {
    return this.categoriesRepository.getCategoryByName(category);
  }

  addCategory(name: string) {
    return this.categoriesRepository.addCategory(name);
  }

  preloadCategories(categories: { name: string }[]) {
    return this.categoriesRepository.preloadCategories(categories);
  }
}
