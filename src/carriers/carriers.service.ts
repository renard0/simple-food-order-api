import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Carrier } from './entities/carrier.entity';
import { Repository } from 'typeorm';
import { CreateCarrierDTO } from './dto/create-carrier.dto';
import { Order, OrderStatus } from '../orders/entity/order.entity';

@Injectable()
export class CarriersService {
  constructor(
    @InjectRepository(Carrier) private carriersRepo: Repository<Carrier>,
    @InjectRepository(Order) private readonly ordersRepo: Repository<Order>,
  ) {}

  async create(data: CreateCarrierDTO): Promise<Carrier> {
    const carrier = await this.carriersRepo.findOne({ phone: data.phone });
    if (carrier) throw new BadRequestException('Phone already in use');
    return this.carriersRepo.save(new Carrier(data));
  }

  findById(id: string) {
    return this.carriersRepo.findOne(id);
  }

  findAll() {
    return this.carriersRepo.find();
  }

  delete(carrierId: string) {
    return this.carriersRepo.softDelete({ id: carrierId });
  }

  async update(carrierId: string, data: CreateCarrierDTO) {
    const carrier = await this.carriersRepo.findOne(carrierId);
    if (!carrier) throw new NotFoundException('Carrier does not exist');

    const [carrierUnderPhone, customer] = await Promise.all([
      this.carriersRepo.findOne({ phone: data.phone }),
      this.carriersRepo.findOne(carrierId),
    ]);
    if (!customer) throw new NotFoundException('Customer does not exist');
    if (carrierUnderPhone && carrierUnderPhone.id !== customer.id) {
      throw new BadRequestException('Phone number already in use');
    }
    const updated = new Carrier({ id: carrierId, ...data });
    return this.carriersRepo.save(updated);
  }

  async getMostPopularAddress(carrierId: string) {
    const carrier = await this.carriersRepo.findOne(carrierId);
    if (!carrier) throw new NotFoundException('Carrier does not exist');

    const mostPopularAddress = await this.ordersRepo
      .createQueryBuilder()
      .where({ carrier, status: OrderStatus.DELIVERED })
      .select('address, COUNT(*)', 'count')
      .groupBy('address')
      .orderBy('count', 'DESC')
      .limit(1)
      .execute();
    
    return mostPopularAddress;
  }

  async totalDeliveredSum(carrierId: string) {
    const carrier = await this.carriersRepo.findOne(carrierId);
    if (!carrier) throw new NotFoundException('Carrier does not exist');

    const total = await this.ordersRepo
      .createQueryBuilder('order')
      .where({
        carrier,
        status: OrderStatus.DELIVERED,
      })
      .select('SUM(products.totalPrice)', 'totalDeliveredSum')
      .leftJoin('order.products', 'products')
      .execute();

    return total[0];
  }

  async averageDeliveryTime(carrierId: string) {
    const carrier = await this.carriersRepo.findOne(carrierId);
    if (!carrier) throw new NotFoundException('Carrier does not exist');

    const result = await this.ordersRepo
      .createQueryBuilder()
      .where({
        carrier,
        status: OrderStatus.DELIVERED,
      })
      .select(
        'SEC_TO_TIME(AVG(TIME_TO_SEC(TIMEDIFF(`deliveredAt`, `pickedAt`))))',
        'averageDeliveryTime',
      )
      .execute();
    return result[0];
  }

  async totalOrders(carrierId: string) {
    const carrier = await this.carriersRepo.findOne(carrierId);
    if (!carrier) throw new NotFoundException('Carrier does not exist');
    const totalOrders = await this.ordersRepo.count({
      carrier,
      status: OrderStatus.DELIVERED,
    });
    return { totalOrders };
  }

  async findOrders(carrierId: string) {
    const carrier = await this.carriersRepo.findOne(carrierId);
    if (!carrier) throw new NotFoundException('Carrier does not exist');
    return this.ordersRepo.find({ carrier });
  }
}
