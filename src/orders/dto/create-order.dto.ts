import { IsNotEmpty, IsUUID, IsArray, ArrayNotEmpty } from "class-validator";

interface ProductOrder {
  code: string,
  quantity: number
}

export class CreateOrderDTO {
  @IsUUID()
  @IsNotEmpty()
  readonly restaurantId: string;

  @IsUUID()
  @IsNotEmpty()
  readonly customerId: string;

  @IsArray()
  @ArrayNotEmpty()
  readonly products: ProductOrder[];

  @IsNotEmpty()
  readonly address: string;
}