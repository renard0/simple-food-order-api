import { Column, Entity, ManyToOne, PrimaryColumn, JoinColumn } from 'typeorm';
import { Order } from './order.entity';
import { Product } from '../../products/entities/product.entity';

@Entity({ name: 'order_product' })
export class OrderProduct {
  @PrimaryColumn()
  orderId: string;

  @PrimaryColumn()
  productCode: string;

  @Column({ type: 'tinyint' })
  quantity: number;

  @Column({ type: 'decimal', scale: 2, precision: 10 })
  sellPrice: number;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    asExpression: 'quantity * sellPrice',
  })
  totalPrice: number;

  @ManyToOne(
    () => Order,
    order => order.products,
    { primary: true },
  )
  @JoinColumn({ name: 'orderId' })
  order: Order;

  @ManyToOne(
    () => Product,
    product => product.orders,
    { primary: true, eager: true },
  )
  @JoinColumn({ name: 'productCode' })
  product: Product;

  constructor(params) {
    Object.assign(this, params);
  }
}
