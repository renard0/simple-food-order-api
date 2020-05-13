import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  UseInterceptors,
  ClassSerializerInterceptor,
  Delete,
  HttpStatus,
  HttpCode,
  Put,
  ParseUUIDPipe,
} from '@nestjs/common';
import { CarriersService } from './carriers.service';
import { CreateCarrierDTO } from './dto/create-carrier.dto';
import { Carrier } from './entities/carrier.entity';
import { Order } from 'src/orders/entity/order.entity';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('carriers')
export class CarriersController {
  constructor(private carriersService: CarriersService) {}

  @Post()
  create(@Body() body: CreateCarrierDTO): Promise<Carrier> {
    return this.carriersService.create(body);
  }

  @Get()
  findAll(): Promise<Carrier[]> {
    return this.carriersService.findAll();
  }

  @Get(':id')
  findById(@Param('id', ParseUUIDPipe) carrierId: string) {
    return this.carriersService.findById(carrierId);
  }

  @Put(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() body: CreateCarrierDTO,
  ): Promise<Carrier> {
    return this.carriersService.update(id, body);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  delete(@Param('id') carrierId: string) {
    return this.carriersService.delete(carrierId);
  }

  @Get(':id/orders')
  findOrders(@Param('id', ParseUUIDPipe) carrierId: string): Promise<Order[]> {
    return this.carriersService.findOrders(carrierId);
  }

  @Get(':id/stats/mostPopularAddress')
  getMostPopularAddress(@Param('id') carrierId: string) {
    return this.carriersService.getMostPopularAddress(carrierId);
  }

  @Get(':id/stats/totalOrdersPrice')
  getTotalDeliveredSum(@Param('id') carrierId: string) {
    return this.carriersService.totalDeliveredSum(carrierId);
  }

  @Get(':id/stats/averageDeliveryTime')
  getAverageDeliveryTime(@Param('id') carrierId: string) {
    return this.carriersService.averageDeliveryTime(carrierId);
  }

  @Get(':id/stats/totalOrders')
  getTotalOrders(@Param('id') carrierId: string) {
    return this.carriersService.totalOrders(carrierId);
  }
}
