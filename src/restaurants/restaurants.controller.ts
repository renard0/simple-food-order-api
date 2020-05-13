import {
  Controller,
  Post,
  Body,
  Put,
  Get,
  Param,
  UseInterceptors,
  ClassSerializerInterceptor,
  ParseUUIDPipe,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { CreateRestaurantDTO } from './dto/create-restaurant.dto';
import { Restaurant } from './entities/restaurant.entity';
import { Product } from '../products/entities/product.entity';
import { RestaurantsService } from './restaurants.service';
import { Order } from 'src/orders/entity/order.entity';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('restaurants')
export class RestaurantsController {
  constructor(private restaurantsService: RestaurantsService) {}

  @Post()
  create(@Body() body: CreateRestaurantDTO): Promise<Partial<Restaurant>> {
    return this.restaurantsService.create(body);
  }

  @Get()
  findAll() {
    return this.restaurantsService.findAll();
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  delete(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    return this.restaurantsService.delete(id);
  }

  @Get(':id')
  findById(@Param('id', ParseUUIDPipe) id: string) {
    return this.restaurantsService.findById(id);
  }

  @Put(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() body: CreateRestaurantDTO,
  ): Promise<Restaurant> {
    return this.restaurantsService.update(id, body);
  }

  @Get(':id/products')
  findAllProducts(@Param('id', ParseUUIDPipe) id: string): Promise<Product[]> {
    return this.restaurantsService.findAllProducts(id);
  }

  @Get(':id/orders')
  findAllOrders(@Param('id', ParseUUIDPipe) id: string): Promise<Order[]> {
    return this.restaurantsService.findAllOrders(id);
  }
}
