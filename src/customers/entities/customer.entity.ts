import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  DeleteDateColumn,
} from 'typeorm';

import { Exclude } from 'class-transformer';
import { Order } from '../../orders/entity/order.entity';

type PhoneNumber = {};

export interface CustomerData {
  id: string;
  firstName: string;
  lastName: string;
  phone: PhoneNumber;
  address: string;
}

@Entity()
export class Customer {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', nullable: false })
  firstName: string;

  @Column({ type: 'varchar', nullable: false })
  lastName: string;

  @Column({ type: 'varchar', nullable: false, unique: true })
  phone: string;

  @Column({ type: 'varchar', nullable: false })
  address: string;

  @OneToMany(
    () => Order,
    orders => orders.customer,
  )
  orders: Order[];

  @Exclude()
  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @Exclude()
  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @Exclude()
  @DeleteDateColumn()
  deletedAt: Date;

  constructor(params: Partial<CustomerData>) {
    Object.assign(this, params);
  }
}
