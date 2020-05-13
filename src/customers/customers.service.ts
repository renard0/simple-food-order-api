import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { Customer } from './entities/customer.entity';
import { CreateCustomerDTO } from './dto/create-customer.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from 'src/orders/entity/order.entity';

@Injectable()
export class CustomersService {
  constructor(
    @InjectRepository(Customer) private customersRepo: Repository<Customer>,
    @InjectRepository(Order) private ordersRepo: Repository<Order>,
  ) {}

  async create(data: CreateCustomerDTO): Promise<Customer> {
    const customer = await this.findByPhoneNumber(data.phone);
    if (customer) throw new BadRequestException('User already exist!');
    return this.customersRepo.save(new Customer(data));
  }

  async delete(id: string): Promise<void> {
    await this.customersRepo.softDelete({ id });
  }

  async findAll(): Promise<Customer[]> {
    return this.customersRepo.find();
  }

  async findById(id: string): Promise<Customer> {
    const customer = await this.customersRepo.findOne(id);
    if (!customer) throw new NotFoundException('Customer does not exist');
    return customer;
  }

  findByPhoneNumber(phone: string): Promise<Customer> {
    return this.customersRepo.findOne({
      where: { phone },
    });
  }

  async update(id: string, data: CreateCustomerDTO): Promise<Customer> {
    const [customerUnderPhone, customer] = await Promise.all([
      this.findByPhoneNumber(data.phone),
      this.customersRepo.findOne(id),
    ]);
    if (!customer) throw new NotFoundException('Customer does not exist');
    if (customerUnderPhone && customerUnderPhone.id !== customer.id) {
      throw new BadRequestException('Phone number already in use');
    }
    const updated = new Customer({ id, ...data });
    return this.customersRepo.save(updated);
  }
  async findOrders(id: string): Promise<Order[]>  {
    const customer = await this.customersRepo.findOne(id);
    if (!customer) throw new NotFoundException('Customer does not exist');
    const orders = await this.ordersRepo.find({ customer });
    return orders;
  }
}
