import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order, OrderStatus } from './entity/order.entity';
import { Repository, In } from 'typeorm';
import { CreateOrderDTO } from './dto/create-order.dto';
import { Product } from '../products/entities/product.entity';
import { Customer } from '../customers/entities/customer.entity';
import { Restaurant } from '../restaurants/entities/restaurant.entity';
import { OrderProduct } from './entity/order-products.entity';
import { CarriersService } from 'src/carriers/carriers.service';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order) private readonly ordersRepo: Repository<Order>,
    @InjectRepository(Product)
    private readonly productRepo: Repository<Product>,
    @InjectRepository(Restaurant)
    private readonly restaurantRepo: Repository<Restaurant>,
    @InjectRepository(Customer)
    private readonly customerRepo: Repository<Customer>,
    private readonly carriersService: CarriersService,
  ) {}

  private findRestaurantProductsByCodes(
    restaurantId,
    ids: string[],
  ): Promise<Product[]> {
    return this.productRepo.find({
      where: {
        restaurant: { id: restaurantId },
        code: In(ids),
      },
    });
  }

  async create(data: CreateOrderDTO): Promise<Order> {
    const [products, restaurant, customer] = await Promise.all([
      this.findRestaurantProductsByCodes(
        data.restaurantId,
        data.products.map(i => i.code),
      ),
      this.restaurantRepo.findOne(data.restaurantId),
      this.customerRepo.findOne(data.customerId),
    ]);

    if (!restaurant) {
      throw new NotFoundException('Restaurant does not exist');
    }
    if (!customer) {
      throw new NotFoundException('Customer does not exist');
    }
    if (products.length !== data.products.length) {
      throw new BadRequestException('Products does not belong to restaurant');
    }

    const orderProducts = products.map(product => {
      const { quantity } = data.products.find(i => i.code === product.code);
      return new OrderProduct({ product, quantity, sellPrice: product.price });
    });

    const order = new Order({
      restaurant,
      customer,
      address: data.address,
      products: orderProducts,
    });

    return this.ordersRepo.save(order);
  }

  async findById(id: string): Promise<Order> {
    const order = await this.ordersRepo.findOne(id);
    if (!order) throw new NotFoundException('Order does not exist');
    return order;
  }

  findAll(): Promise<Order[]> {
    return this.ordersRepo.find();
  }

  async assignCarrier(orderId: string, carrierId: string): Promise<Order> {
    const [carrier, order] = await Promise.all([
      this.carriersService.findById(carrierId),
      this.ordersRepo.findOne(orderId),
    ]);
    if (!carrier) throw new NotFoundException('Carrier does not exits');
    if (!order) throw new NotFoundException('Order doesn not exits');
    order.carrier = carrier;
    await this.ordersRepo.update({ id: order.id }, { carrier });
    return order;
  }

  async acceptOrder(orderId: string): Promise<Order> {
    const order = await this.ordersRepo.findOne(orderId);
    if (!order) throw new NotFoundException('Order does not exits');
    order.status = OrderStatus.ACCEPTED;
    await this.ordersRepo.update({ id: orderId }, { status: order.status });
    return order;
  }

  async pickUpOrder(orderId: string): Promise<Order> {
    const order = await this.ordersRepo.findOne(orderId);
    if (!order) throw new NotFoundException('Order does not exits');
    order.status = OrderStatus.PICKED_UP;
    await this.ordersRepo.update(
      { id: orderId },
      { status: order.status, pickedAt: () => 'CURRENT_TIMESTAMP' },
    );
    return order;
  }

  async deliverOrder(orderId: string): Promise<Order> {
    const order = await this.ordersRepo.findOne(orderId);
    if (!order) throw new NotFoundException('Order does not exits');
    order.status = OrderStatus.DELIVERED;
    await this.ordersRepo.update(
      { id: orderId },
      { status: order.status, deliveredAt: () => 'CURRENT_TIMESTAMP' },
    );
    return order;
  }

}
