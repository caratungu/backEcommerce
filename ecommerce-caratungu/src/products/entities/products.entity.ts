import { Category } from '../../categories/entities/categories.entity';
import { Column, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';

@Entity({
  name: 'products',
})
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string = uuid();

  @Column({
    length: 50,
    nullable: false,
    unique: true,
  })
  name: string;

  @Column({
    nullable: false,
    type: 'text',
  })
  description: string;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    nullable: false,
  })
  price: number;

  @Column({
    type: 'integer',
    nullable: false,
  })
  stock: number;

  @Column({
    type: 'text',
    default:
      'https://res.cloudinary.com/du92uyaqq/image/upload/v1716950165/ecommerce/productTecno_hm2bub.jpg',
  })
  imgUrl: string;

  @DeleteDateColumn({
    nullable: true,
  })
  deleteDate?: Date;

  @ManyToOne(() => Category, (category) => category.products)
  @JoinColumn({ name: 'category_id' })
  category: Category | Category['id'];
}
