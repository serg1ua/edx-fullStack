import { v4 as uuid } from 'uuid';
import { Repository } from 'typeorm';
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthService } from '../auth/auth.service';
import { Customer } from './customer.entity';
import { Review } from '../book/review.entity';
import { LoginCustomerDto } from './dto/customer.dto';
import { BookService } from '../book/book.service';

@Injectable()
export class CustomerService {
  constructor(
    private readonly authService: AuthService,
    private readonly bookService: BookService,
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,
    @InjectRepository(Review)
    private readonly reviewRepository: Repository<Review>,
  ) {}

  async login({ userName, password }: LoginCustomerDto) {
    const customer = await this.customerRepository.findOneBy({ userName });
    if (!customer) {
      throw new BadRequestException(`Customer: ${userName} not found`);
    }

    await this.authService.verifyPassword(password, customer.password);

    const authToken = this.authService.signAuthToken({
      id: customer.id,
      userName: customer.userName,
    });

    return { id: customer.id, userName: customer.userName, authToken };
  }

  async addReview(customer: Customer, isbn: string, review: string) {
    try {
      const [book] = await this.bookService.getBookByParam('isbn', isbn);
      if (!book) {
        throw new BadRequestException('Book not found');
      }

      const reviewCreated = await this.reviewRepository.insert({
        id: uuid(),
        customer: { id: customer.id },
        review,
        book,
      });
      return reviewCreated.identifiers;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async updateReview(
    customer: Customer,
    id: string,
    review: string,
  ): Promise<void> {
    try {
      await this.findReviewByIdAndCustomer(customer, id);
      await this.reviewRepository.update({ id }, { review });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async deleteReview(customer: Customer, id: string): Promise<void> {
    try {
      const review = await this.findReviewByIdAndCustomer(customer, id);
      await this.reviewRepository.delete(review.id);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  private async findReviewByIdAndCustomer(
    customer: Customer,
    id: string,
  ): Promise<Review> {
    const reviewByIdAndCustomer = await this.reviewRepository.findOne({
      relations: {
        customer: true,
      },
      where: {
        id,
        customer: {
          id: customer.id,
        },
      },
    });

    if (!reviewByIdAndCustomer) {
      throw new BadRequestException(
        `The review with given id: ${id} is not found or it does not belong to customer: ${customer.userName}`,
      );
    }
    return reviewByIdAndCustomer;
  }
}
