import { Controller, Post } from '@nestjs/common';
import { CustomerService } from './customer.service';

@Controller('customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Post('login')
  login() {
    return this.customerService.login();
  }

  @Post('auth/review/:isbn')
  addReview() {
    return this.customerService.addReview();
  }
}
