import { Category } from 'src/categories/categories.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
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
    type: "integer",
    nullable: false,
  })
  stock: number;

  @Column()
  imgUrl: string; //! Incluir imagen por defecto

  @ManyToOne(() => Category, (category) => category.products)
  category: Category | Category['name'];
}
