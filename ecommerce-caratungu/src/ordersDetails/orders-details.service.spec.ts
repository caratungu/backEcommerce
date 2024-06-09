import { Test } from '@nestjs/testing';
import { OrderDetailDto } from './dtos/orders-details.dto';
import { OrderDetail } from './entities/orders-details.entity';
import { OrdersDetailsRepository } from './orders-details.repository';
import { OrdersDetailsService } from './orders-details.service';

describe('ordersDetailsService', () => {
  let ordersDetailsService: OrdersDetailsService;

  const mockOrderDetails: OrderDetail = {
    id: '12a215f2-435a-47e6-a443-5a7dc38871dd',
    price: 499,
    products: [],
  };

  const mockOrderDetailDto: OrderDetailDto = {
    price: 499,
    products: [],
  };

  beforeEach(async () => {
    const mockOrdersDetailsRepository: Partial<OrdersDetailsRepository> = {
      getOrderDetailsByID: async (id: string) =>
        Promise.resolve(mockOrderDetails),

      createOrderDetails: async (orderDetail: OrderDetailDto) =>
        Promise.resolve({
          ...orderDetail,
          id: '12a215f2-435a-47e6-a443-5a7dc38871dd',
        }),
    };

    const module = await Test.createTestingModule({
      providers: [
        OrdersDetailsService,
        {
          provide: OrdersDetailsRepository,
          useValue: mockOrdersDetailsRepository,
        },
      ],
    }).compile();

    ordersDetailsService =
      module.get<OrdersDetailsService>(OrdersDetailsService);
  });

  it('Crear una instancia de OrdersDetailsService', () => {
    expect(ordersDetailsService).toBeDefined();
  });

  it('Obtiene un detalle de orden por id', async () => {
    const orderDetails = await ordersDetailsService.getOrderDetailsById(
      mockOrderDetails.id,
    );
    expect(orderDetails).toEqual(mockOrderDetails);
  });

  it('Crea un detalle de orden', async () => {
    const orderDetail =
      await ordersDetailsService.createOrderDetails(mockOrderDetailDto);
    expect(orderDetail).toEqual({
      ...mockOrderDetailDto,
      id: '12a215f2-435a-47e6-a443-5a7dc38871dd',
    });
  });
});
