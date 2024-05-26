import { Category } from "src/categories/categories.entity";

interface IProductDto {
  name: string;
  description: string;
  price: number;
  stock: number;
  imgUrl: string;
  category: string;
}

export default IProductDto;
