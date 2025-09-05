import { Repository } from 'typeorm';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthService } from '../auth/auth.service';
import { Customer } from './customer.entity';
import { LoginCustomerDto } from './customer.dto';

@Injectable()
export class CustomerService {
  constructor(
    private readonly authService: AuthService,
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,
  ) {}

  async login({ userName, password }: LoginCustomerDto) {
    const customer = await this.customerRepository.findOneBy({ userName });
    if (!customer) {
      throw new BadRequestException(`Customer: ${userName} not found`);
    }

    await this.authService.verifyPassword(password, customer.password);

    const authToken = await this.authService.signAuthToken({
      id: customer.id,
      userName: customer.userName,
    });

    return { id: customer.id, userName: customer.userName, authToken };
  }

  addReview() {
    //
  }
}
