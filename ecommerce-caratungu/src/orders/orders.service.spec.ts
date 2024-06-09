import { Product } from 'src/products/entities/products.entity';
import { Order } from './entities/orders.entity';
import { OrdersRepository } from './orders.repository';
import { OrdersService } from './orders.service';
import { Test } from '@nestjs/testing';

describe('ordersService', () => {
  let ordersService: OrdersService;

  const mockOrder: Order = {
    id: '12a215f2-435a-47e6-a443-5a7dc38871dd',
    date: new Date(),
    user: '12a215f2-435a-47e6-a443-5a7dc38871de',
    orderDetail: '12a215f2-435a-47e6-a443-5a7dc38871df',
  };

  const mockProducts: { id: string }[] = [
    {
      id: '12a215f2-435a-47e6-a443-5a7dc38871dd',
    },
    {
      id: '12a215f2-435a-47e6-a443-5a7dc38871de',
    },
  ];

  beforeEach(async () => {
    const mockOrdersRepository: Partial<OrdersRepository> = {
      getOrder: async (id: string) => Promise.resolve(mockOrder),

      addOrder: async (userId: string, products: Partial<Product>[]) =>
        Promise.resolve({ order: mockOrder }),
    };

    const module = await Test.createTestingModule({
      providers: [
        OrdersService,
        {
          provide: OrdersRepository,
          useValue: mockOrdersRepository,
        },
      ],
    }).compile();

    ordersService = module.get<OrdersService>(OrdersService);
  });

  it('Crear una instancia de OrdersService', () => {
    expect(ordersService).toBeDefined();
  });

  it('Obtiene orden por id', async () => {
    const order = await ordersService.getOrders(mockOrder.id);
    expect(order).toEqual(mockOrder);
  });

  it('Crear orden', async () => {
    const order = await ordersService.addOrder(
      '12a215f2-435a-47e6-a443-5a7dc38871de',
      mockProducts,
    );
    expect(order).toEqual({ order: mockOrder });
  });
});
