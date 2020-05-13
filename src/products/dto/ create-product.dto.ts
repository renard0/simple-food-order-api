import { IsNotEmpty, IsNumberString, IsUUID } from 'class-validator';

export class CreateProductDTO {
  @IsNotEmpty()
  readonly code: string;

  @IsNotEmpty()
  readonly name: string;

  @IsNotEmpty()
  @IsNumberString()
  readonly price: number;

  @IsNotEmpty()
  @IsUUID()
  readonly restaurantId: number;
}
