import { Product } from 'src/products/products.entity';

interface IOrderDetailDto {
  price: number;
  products: Product[];
}

export default IOrderDetailDto;
