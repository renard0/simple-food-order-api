import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entity/order.entity';
import { ProductsModule } from '../products/products.module';
import { Restaurant } from '../restaurants/entities/restaurant.entity';
import { Customer } from '../customers/entities/customer.entity';
import { Product } from '../products/entities/product.entity';
import { OrderProduct } from './entity/order-products.entity';
import { CarriersModule } from 'src/carriers/carriers.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Order,
      Restaurant,
      Customer,
      Product,
      OrderProduct,
    ]),
    ProductsModule,
    CarriersModule,
  ],
  providers: [OrdersService],
  controllers: [OrdersController],
})
export class OrdersModule {}
