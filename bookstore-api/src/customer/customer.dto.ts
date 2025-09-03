import { IsNotEmpty, IsString } from 'class-validator';

export class LoginCustomerDto {
  @IsNotEmpty()
  @IsString()
  userName: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
