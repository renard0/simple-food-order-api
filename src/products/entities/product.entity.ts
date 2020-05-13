import {
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  PrimaryColumn,
  ManyToOne,
  OneToMany,
  DeleteDateColumn,
} from 'typeorm';
import { Restaurant } from '../../restaurants/entities/restaurant.entity';
import { Exclude } from 'class-transformer';
import { OrderProduct } from '../../orders/entity/order-products.entity';

export interface ProductData {
  code: string;
  name: string;
  price: number;
  restaurant: Restaurant;
}

@Entity()
export class Product {
  @PrimaryColumn({ type: 'varchar' })
  code: string;

  @Column({ type: 'varchar', nullable: false })
  name: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
  price: number;

  @Exclude()
  @CreateDateColumn()
  createdAt: Date;

  @Exclude()
  @UpdateDateColumn()
  updatedAt: Date;

  @Exclude()
  @DeleteDateColumn()
  deletedAt: Date;

  @Exclude()
  @ManyToOne(
    () => Restaurant,
    restaurant => restaurant.products,
  )
  restaurant: Restaurant;
   
  @Exclude()
  @OneToMany(
    () => OrderProduct,
    op => op.product,
  )
  orders: OrderProduct[];

  constructor(params: Partial<ProductData>) {
    Object.assign(this, params);
  }
}
