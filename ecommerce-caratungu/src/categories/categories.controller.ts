import { Body, Controller, Get, Post, UseInterceptors } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dtos/CreateCategory.dto';
import { PreloadCategoriesInterceptor } from '../interceptors/preloadCategories.interceptor';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Categories')
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  getCategories() {
    return this.categoriesService.getCategories();
  }

  @Post()
  addCategory(@Body() category: CreateCategoryDto) {
    const { name } = category
    return this.categoriesService.addCategory(name);
  }

  @Post('seeder')
  @UseInterceptors(PreloadCategoriesInterceptor)
  preloadCategories(@Body() categories) {
    return this.categoriesService.preloadCategories(categories);
  }
}
