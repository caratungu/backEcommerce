import { Order } from "src/orders/orders.entity";
import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuid } from 'uuid';

@Entity({
    name: 'users'
})
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string = uuid();

  @Column({
    type: 'varchar',
    length: 50,
    nullable: false,
    unique: true,
  })
  email: string;
  
  @Column({
    type: 'varchar',
    length: 50,
    nullable: false,
  })
  name: string;
  
  @Column({
    type: 'varchar',
    length: 100,
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
    type: 'varchar',
    length: 50,
  })
  country?: string | undefined;
  
  @Column({
    type: 'varchar',
    length: 50,
  })
  city?: string | undefined;

  @Column({
    default: false,
    select:false,
  })
  is_admin: boolean;

  @OneToMany(() => Order, (order) => order.user)
  orders: Order[];
}
