import { OrderDetail } from '../ordersDetails/orders-details.entity';
import { User } from '../users/users.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';

@Entity({
  name: 'orders',
})
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string = uuid();

  @Column()
  date: Date;

  @ManyToOne(() => User, (user) => user.orders)
  user: User | User['id'];

  @OneToOne(() => OrderDetail)
  @JoinColumn()
  orderDetail: OrderDetail | OrderDetail['id']
}
