import { Order } from "src/orders/orders.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuid } from 'uuid';

@Entity({
    name: 'users'
})
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string = uuid();

  @Column({
    length: 50,
    nullable: false,
    unique: true,
  })
  email: string;
  
  @Column({
    length: 50,
    nullable: false,
  })
  name: string;
  
  @Column({
    length: 20,
    nullable: false,
    select: false,
  })
  password: string;
  
  @Column()
  address: string;
  
  @Column({
    type: "integer"
  })
  phone: number;
  
  @Column({
    length: 50,
  })
  country?: string | undefined;
  
  @Column({
    length: 50,
  })
  city?: string | undefined;

  @OneToMany(() => Order, (order) => order.user)
  orders: Order[];
}
