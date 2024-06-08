import { Test } from '@nestjs/testing';
import { CategoriesService } from './categories.service';
import { CategoriesRepository } from './categories.repository';
import { Category } from './entities/categories.entity';

describe('categoriesService', () => {
  let categoriesService: CategoriesService;

  const mockCategory1: Category = {
    id: '12a215f2-435a-47e6-a443-5a7dc38871dd',
    name: 'Category 1',
    products: [],
  };

  const mockCategory2: Category = {
    id: '12a215f2-435a-47e6-a443-5a7dc38871de',
    name: 'Category 2',
    products: [],
  };

  beforeEach(async () => {
    const mockCategoriesRepository: Partial<CategoriesRepository> = {
      getCategories: async () =>
        Promise.resolve([mockCategory1, mockCategory2]),

      getCategoryByName: async (name: string) => Promise.resolve(mockCategory1),

      addCategory: async (name: string) => Promise.resolve('Categoría creada'),
    };

    const module = await Test.createTestingModule({
      providers: [
        CategoriesService,
        {
          provide: CategoriesRepository,
          useValue: mockCategoriesRepository,
        },
      ],
    }).compile();

    categoriesService = module.get<CategoriesService>(CategoriesService);
  });

  it('Crear una instancia de CategoriesService', () => {
    expect(categoriesService).toBeDefined();
  });

  it('Devuelve catgeorías en BD', async () => {
    const categories: Category[] = await categoriesService.getCategories();
    expect(categories).toEqual([mockCategory1, mockCategory2]);
  });

  it('Devuelve una catgeoría por nombre', async () => {
    const category: Category =
      await categoriesService.getCategoryByName('Category 1');
    expect(category).toEqual(mockCategory1);
  });

  it('Crea categoría', async () => {
    const message = await categoriesService.addCategory('Category');
    expect(message).toBe('Categoría creada');
  });
});
