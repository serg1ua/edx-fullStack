import type { Response } from 'express';
import { Body, Controller, Post, Res } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { CustomerService } from './customer.service';
import { LoginCustomerDto } from './customer.dto';
import { Customer } from './customer.entity';

@Controller('customer')
export class CustomerController {
  constructor(
    private readonly authService: AuthService,
    private readonly customerService: CustomerService,
  ) {}

  @Post('login')
  async login(
    @Body() dto: LoginCustomerDto,
    @Res() res: Response,
  ): Promise<Response<Pick<Customer, 'id' | 'userName'>>> {
    const { id, userName, authToken } = await this.customerService.login(dto);

    this.authService.setCookie(authToken, res);
    return res.send({ id, userName });
  }

  @Post('auth/review/:isbn')
  addReview() {
    return this.customerService.addReview();
  }
}
