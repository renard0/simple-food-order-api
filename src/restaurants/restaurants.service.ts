import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Restaurant } from './entities/restaurant.entity';
import { Repository } from 'typeorm';
import { CreateRestaurantDTO } from './dto/create-restaurant.dto';
import { UpdateRestaurantDTO } from './dto/update-restaurant.dto';
import { Product } from 'src/products/entities/product.entity';
import { Order } from 'src/orders/entity/order.entity';

@Injectable()
export class RestaurantsService {
  constructor(
    @InjectRepository(Restaurant)
    private restaurantsRepo: Repository<Restaurant>,
  ) {}

  async create(data: CreateRestaurantDTO): Promise<Restaurant> {
    const restaurant = await this.restaurantsRepo.findOne({
      where: { name: data.name, address: data.address },
    });
    if (restaurant) throw new BadRequestException('Restaurant already exist');
    return this.restaurantsRepo.save(new Restaurant(data));
  }

  async findAll(): Promise<Restaurant[]> {
    return this.restaurantsRepo.find();
  }

  async findById(id: string): Promise<Restaurant> {
    const restaurant = await this.restaurantsRepo.findOne(id);
    if (!restaurant) throw new NotFoundException('Restaurant does not exist');
    return restaurant;
  }

  async delete(id: string): Promise<void> {
    await this.restaurantsRepo.softDelete(id);
  }

  async update(id: string, data: UpdateRestaurantDTO): Promise<Restaurant> {
    const restaurant = await this.restaurantsRepo.findOne(id);
    if (!restaurant) throw new NotFoundException('Restaurant does not exist');
    return this.restaurantsRepo.save(new Restaurant({ id, ...data }));
  }

  async findAllProducts(id: string): Promise<Product[]> {
    const restaurant = await this.restaurantsRepo.findOne(id, {
      relations: ['products'],
    });
    if (!restaurant) throw new NotFoundException('Restaurant does not exist');
    return restaurant.products;
  }

  async findAllOrders(id: string): Promise<Order[]> {
    const restaurant = await this.restaurantsRepo.findOne(id, {
      relations: ['orders'],
    });
    if (!restaurant) throw new NotFoundException('Restaurant does not exist');
    return restaurant.orders;
  }
}
