import {
  Controller,
  Get,
  Post,
  Body,
  ClassSerializerInterceptor,
  UseInterceptors,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  Put,
  ParseUUIDPipe,
} from '@nestjs/common';
import { CreateCustomerDTO } from './dto/create-customer.dto';
import { CustomerData, Customer } from './entities/customer.entity';
import { CustomersService } from './customers.service';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @Post()
  async create(@Body() body: CreateCustomerDTO): Promise<Customer> {
    return this.customersService.create(body);
  }

  @Get()
  findAll(): Promise<CustomerData[]> {
    return this.customersService.findAll();
  }

  @Get(':id')
  findById(@Param('id', ParseUUIDPipe) id: string): Promise<Customer> {
    return this.customersService.findById(id);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  delete(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    return this.customersService.delete(id);
  }

  @Put(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() body: CreateCustomerDTO,
  ): Promise<Customer> {
    return this.customersService.update(id, body);
  }

  @Get(':id/orders')
  findCustomerOrders(@Param('id', ParseUUIDPipe) id: string) {
    return this.customersService.findOrders(id);
  }
}
