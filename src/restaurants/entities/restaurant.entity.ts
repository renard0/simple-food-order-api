import {
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Entity,
  Index,
  OneToMany,
  DeleteDateColumn,
} from 'typeorm';
import { Product } from '../../products/entities/product.entity';
import { Order } from '../../orders/entity/order.entity';
import { Exclude } from 'class-transformer';

@Entity()
@Index(['name', 'address'], { unique: true })
export class Restaurant {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', nullable: false })
  name: string;

  @Column({ type: 'varchar', nullable: false })
  address: string;

  @Column({ type: 'varchar', nullable: false })
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
    () => Product,
    product => product.restaurant,
  )
  products: Product[];

  @OneToMany(
    () => Order,
    order => order.restaurant,
  )
  orders: Order[];

  constructor(params: Partial<Restaurant>) {
    Object.assign(this, params);
  }
}
