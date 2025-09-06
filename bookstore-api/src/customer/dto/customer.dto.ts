import { IsNotEmpty, IsString } from 'class-validator';

export class LoginCustomerDto {
  @IsNotEmpty()
  @IsString()
  userName: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}

export type AuthCustomerResponse = {
  id: string;
  userName: string;
  authToken: string;
};
