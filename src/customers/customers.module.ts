import { Module } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CustomersController } from './customers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customer } from './entities/customer.entity';
import { Order } from '../orders/entity/order.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Customer, Order])],
  providers: [CustomersService],
  controllers: [CustomersController]
})
export class CustomersModule {}
