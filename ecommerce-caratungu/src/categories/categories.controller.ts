import { Body, Controller, Get, Post, UseGuards, UseInterceptors } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dtos/CreateCategory.dto';
import { PreloadCategoriesInterceptor } from '../interceptors/preloadCategories.interceptor';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../auth/guards/auth.guard';
import { RolesGuard } from '../guards/roles.guard';
import { Roles } from '../decorators/roles.decorator';
import { Role } from '../roles.enum';

@ApiTags('Categories')
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  getCategories() {
    return this.categoriesService.getCategories();
  }

  @ApiBearerAuth()
  @Post()
  @Roles(Role.ADMIN)
  @UseGuards(AuthGuard, RolesGuard)
  addCategory(@Body() category: CreateCategoryDto) {
    const { name } = category
    return this.categoriesService.addCategory(name);
  }

  @Post('seeder')
  @UseInterceptors(PreloadCategoriesInterceptor)
  preloadCategories(@Body() categories: { name: string }[]) {
    return this.categoriesService.preloadCategories(categories);
  }
}
