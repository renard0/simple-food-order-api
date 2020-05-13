import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomersModule } from './customers/customers.module';
import { ProductsModule } from './products/products.module';
import { RestaurantsModule } from './restaurants/restaurants.module';
import { CarriersModule } from './carriers/carriers.module';
import { OrdersModule } from './orders/orders.module';


@Module({
  imports: [
    TypeOrmModule.forRoot(),
    CustomersModule,
    ProductsModule,
    RestaurantsModule,
    CarriersModule,
    OrdersModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
