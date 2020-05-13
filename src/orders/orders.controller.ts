import {
  Controller,
  Post,
  Body,
  UseInterceptors,
  ClassSerializerInterceptor,
  Get,
  Param,
  Patch,
  ParseUUIDPipe,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDTO } from './dto/create-order.dto';
import { Order } from './entity/order.entity';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('orders')
export class OrdersController {
  constructor(private ordersService: OrdersService) {}

  @Post()
  create(@Body() body: CreateOrderDTO): Promise<Order> {
    return this.ordersService.create(body);
  }

  @Get()
  findAll(): Promise<Order[]> {
    return this.ordersService.findAll();
  }

  @Get(':id')
  findById(@Param('id', ParseUUIDPipe) id: string): Promise<Order> {
    return this.ordersService.findById(id);
  }

  @Patch(':id/carrier')
  assignCarrier(
    @Param('id', ParseUUIDPipe) orderId: string,
    @Body('carrierId') carrierId: string,
  ): Promise<Order> {
    return this.ordersService.assignCarrier(orderId, carrierId);
  }

  @Patch(':id/accept')
  acceptOrder(@Param('id', ParseUUIDPipe) orderId: string) {
    return this.ordersService.acceptOrder(orderId);
  }

  @Patch(':id/pickUp')
  pickUpOrder(@Param('id', ParseUUIDPipe) orderId: string) {
    return this.ordersService.pickUpOrder(orderId);
  }

  @Patch(':id/deliver')
  deliverOrder(@Param('id', ParseUUIDPipe) orderId: string) {
    return this.ordersService.deliverOrder(orderId);
  }
}
