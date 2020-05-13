import { IsNotEmpty, IsPhoneNumber } from 'class-validator';

export class CreateCustomerDTO {
  @IsNotEmpty()
  readonly firstName: string;
  @IsNotEmpty()
  readonly lastName: string;
  @IsNotEmpty()
  @IsPhoneNumber('ZZ')
  readonly phone: string;
  @IsNotEmpty()
  readonly address: string;
}