import { Module } from '@nestjs/common';
import { CarriersService } from './carriers.service';
import { CarriersController } from './carriers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Carrier } from './entities/carrier.entity';
import { Order } from 'src/orders/entity/order.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Carrier, Order])],
  providers: [CarriersService],
  controllers: [CarriersController],
  exports: [CarriersService]
})
export class CarriersModule {}
