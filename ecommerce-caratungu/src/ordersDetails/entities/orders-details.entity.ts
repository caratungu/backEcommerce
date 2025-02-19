import { Product } from '../../products/entities/products.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';

@Entity({
  name: 'orders_details',
})
export class OrderDetail {
  @PrimaryGeneratedColumn('uuid')
  id: string = uuid();

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    nullable: false,
  })
  price: number;

  @ManyToMany(() => Product)
  @JoinTable()
  products: Product[];
}
