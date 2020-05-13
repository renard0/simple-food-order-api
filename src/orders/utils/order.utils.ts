import { OrderProduct } from '../entity/order-products.entity';

export const mapOrderProducts = (orderProducts: OrderProduct[]) => {
  return orderProducts.map(p => ({
    code: p.productCode,
    quantity: p.quantity,
    name: p.product.name,
    price: p.product.price,
  }));
};
