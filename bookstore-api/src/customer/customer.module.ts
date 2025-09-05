import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerController } from './customer.controller';
import { CustomerService } from './customer.service';
import { AuthModule } from '../auth/auth.module';
import { Customer } from './customer.entity';
import { BookModule } from '../book/book.module';
import { Review } from '../book/review.entity';

@Module({
  imports: [
    AuthModule,
    BookModule,
    TypeOrmModule.forFeature([Customer, Review]),
  ],
  controllers: [CustomerController],
  providers: [CustomerService],
})
export class CustomerModule {}
