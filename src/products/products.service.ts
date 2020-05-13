import { Repository } from 'typeorm';
import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { CreateProductDTO } from './dto/ create-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Restaurant } from 'src/restaurants/entities/restaurant.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productsRepo: Repository<Product>,
    @InjectRepository(Restaurant)
    private restaurantsRepo: Repository<Restaurant>,
  ) {}

  async create(data: CreateProductDTO): Promise<Product> {
    const { code, price, name, restaurantId } = data;
    const [restaurant, product] = await Promise.all([
      this.restaurantsRepo.findOne(restaurantId),
      this.productsRepo.findOne({ code }),
    ]);
    if (!restaurant) throw new NotFoundException('Restaurant does not exist');
    if (product) throw new BadRequestException('Product codes must be unique');
    const newProduct = new Product({ code, price, name, restaurant });
    return this.productsRepo.save(newProduct);
  }

  async findById(id: string): Promise<Product> {
    const product = await this.productsRepo.findOne(id);
    if (!product) throw new NotFoundException('Product does not exist');
    return product;
  }

  async delete(id: string): Promise<void> {
    await this.productsRepo.softDelete(id);
  }

  async update(id: string, data: CreateProductDTO): Promise<Product> {
    const { restaurantId, code, name, price } = data;
    const [product, restaurant] = await Promise.all([
      this.productsRepo.findOne(id),
      this.restaurantsRepo.findOne(restaurantId),
    ]);
    
    if (!product) throw new NotFoundException('Product does not exist');
    if (!restaurant) throw new NotFoundException('Restaurant does not exist');
    return this.productsRepo.save(new Product({ code, name, price }));
  }
}
