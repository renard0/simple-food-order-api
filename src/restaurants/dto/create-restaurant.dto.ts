import { IsNotEmpty } from "class-validator";

export class CreateRestaurantDTO {
  @IsNotEmpty()
  readonly name: string;
  @IsNotEmpty()
  readonly address: string;
  @IsNotEmpty()
  readonly phone: string;
}