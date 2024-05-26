import { Body, Controller, Get, Post, UseInterceptors } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import ICategoryDto from './categoriesDto';
import { PreloadCategoriesInterceptor } from 'src/interceptors/preloadCategories.interceptor';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  getCategories() {
    return this.categoriesService.getCategories();
  }

  @Post()
  addCategory(@Body() category: ICategoryDto) {
    return this.categoriesService.addCategory(category);
  }

  @Post('seeder')
  @UseInterceptors(PreloadCategoriesInterceptor)
  preloadCategories(@Body() categories) {
    return this.categoriesService.preloadCategories(categories);
  }
}
