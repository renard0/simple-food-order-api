import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  Column,
} from 'typeorm';
import { Restaurant } from '../../restaurants/entities/restaurant.entity';
import { Customer } from '../../customers/entities/customer.entity';
import { Exclude, Transform, Expose } from 'class-transformer';
import { Carrier } from '../../carriers/entities/carrier.entity';
import { OrderProduct } from './order-products.entity';
import { mapOrderProducts } from '../utils/order.utils';

export enum OrderStatus {
  CREATED = 'CREATED',
  ACCEPTED = 'ACCEPTED',
  DELIVERED = 'DELIVERED',
  PICKED_UP = 'PICKED_UP',
}

@Entity()
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'enum',
    enum: OrderStatus,
    default: OrderStatus.CREATED,
  })
  status: string;

  @ManyToOne(
    () => Restaurant,
    restaurant => restaurant.orders,
    { eager: true },
  )
  restaurant: Restaurant;

  @ManyToOne(
    () => Customer,
    customer => customer.orders,
    { eager: true },
  )
  customer: Customer;

  @ManyToOne(
    () => Carrier,
    carrier => carrier.orders,
    { eager: true },
  )
  carrier: Carrier;

  @Transform(mapOrderProducts)
  @OneToMany(
    () => OrderProduct,
    op => op.order,
    { eager: true, cascade: true },
  )
  products: OrderProduct[];

  @Column({ type: 'varchar', nullable: false })
  address: string;

  @Expose()
  get totalPrice(): number {
    const products = this.products.map(p => ({
      price: p.product.price,
      quantity: p.quantity,
    }));
    return products.reduce(
      (res, product) => (res += product.price * product.quantity),
      0,
    );
  }

  @Exclude()
  @CreateDateColumn()
  createdAt: Date;

  @Exclude()
  @UpdateDateColumn()
  updatedAt: Date;

  @Exclude()
  @Column({ nullable: true })
  deliveredAt: Date;

  @Exclude()
  @Column({ nullable: true })
  pickedAt: Date;

  constructor(params: Partial<Order>) {
    Object.assign(this, params);
  }
}
