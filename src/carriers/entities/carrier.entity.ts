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

export interface CarrierData {
  id: string;
  firstName: string;
  lastName: string;
  phone: PhoneNumber;
}

@Entity()
export class Carrier {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', nullable: false })
  firstName: string;

  @Column({ type: 'varchar', nullable: false })
  lastName: string;

  @Column({ type: 'varchar', nullable: false, unique: true })
  phone: string;

  @Exclude()
  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @Exclude()
  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @Exclude()
  @DeleteDateColumn()
  deletedAt: Date;

  @OneToMany(
    () => Order,
    orders => orders.carrier,
  )
  orders: Order[];

  constructor(params: Partial<CarrierData>) {
    Object.assign(this, params);
  }
}
