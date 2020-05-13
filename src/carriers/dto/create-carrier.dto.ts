import { IsNotEmpty } from "class-validator";

export class CreateCarrierDTO {
  @IsNotEmpty()
  readonly firstName: string;
  @IsNotEmpty()
  readonly lastName: string;
  @IsNotEmpty()
  readonly phone: string;
}