import { Test } from '@nestjs/testing';
import { CreateProductDto } from './dtos/CreateProduct.dto';
import { Product } from './entities/products.entity';
import { ProductsRepository } from './products.repository';
import { ProductsService } from './products.service';

describe('productsService', () => {
  let productsService: ProductsService;

  const mockProduct1: Product = {
    id: '12a215f2-435a-47e6-a443-5a7dc38871dd',
    name: 'Product 01',
    description: 'Description 1',
    price: 99,
    stock: 10,
    imgUrl: 'urlImageProduct1',
    category: 'Category Product 1',
  };

  const mockProduct2: Product = {
    id: '12a215f2-435a-47e6-a443-5a7dc38871de',
    name: 'Product 02',
    description: 'Description 2',
    price: 199,
    stock: 10,
    imgUrl: 'urlImageProduct2',
    category: 'Category Product 2',
  };

  beforeEach(async () => {
    const mockProductsRepository: Partial<ProductsRepository> = {
      getProducts: async (page: number, limit: number) =>
        Promise.resolve([mockProduct1, mockProduct2]),

      getProductById: async (id: string) => Promise.resolve(mockProduct1),

      createProduct: async (product: CreateProductDto) =>
        Promise.resolve({
          message: 'Producto creado',
          product: { ...product, id: '12a215f2-435a-47e6-a443-5a7dc38871dd' },
        }),

      updateProduct: async (product: Product) =>
        Promise.resolve({ message: 'Producto actualizado', id: product.id }),

      deleteProduct: async (id: string) =>
        Promise.resolve(`Producto con id: ${id} eliminado`),
    };

    const module = await Test.createTestingModule({
      providers: [
        ProductsService,
        {
          provide: ProductsRepository,
          useValue: mockProductsRepository,
        },
      ],
    }).compile();

    productsService = module.get<ProductsService>(ProductsService);
  });

  it('Crea una instancia de ProductsService', () => {
    expect(productsService).toBeDefined();
  });

  it('Devuelve array productos', async () => {
    const products = await productsService.getProducts(1, 5);
    expect(products).toEqual([mockProduct1, mockProduct2]);
  });

  it('Devuelve producto por id', async () => {
    const product = await productsService.getProductById(mockProduct1.id);
    expect(product).toEqual(mockProduct1);
  });

  it('Crea producto', async () => {
    const productToAdd = {
      name: 'Producto nuevo',
      description: 'Descripción del nuevo producto',
      price: 99,
      stock: 10,
      imgUrl: 'urlImgProductoNuevo',
      category: 'Categoría de producto nuevo',
    };
    const newProduct = await productsService.createProduct(productToAdd);
    expect(newProduct).toEqual({ message: 'Producto creado', product: { ...productToAdd, id: '12a215f2-435a-47e6-a443-5a7dc38871dd' } })
  });
});
