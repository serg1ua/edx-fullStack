import { v4 as uuid } from 'uuid';
import { Repository } from 'typeorm';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthService } from '../auth/auth.service';
import { Customer } from '../customer/customer.entity';
import { Book } from './book.entity';
import { Review } from './review.entity';
import {
  AuthCustomerResponse,
  LoginCustomerDto,
} from '../customer/customer.dto';
import { Nullable } from '../types';

@Injectable()
export class BookService {
  constructor(
    private readonly authService: AuthService,
    @InjectRepository(Book) private readonly bookRepository: Repository<Book>,
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,
    @InjectRepository(Review)
    private readonly reviewRepository: Repository<Review>,
  ) {}

  async register({
    userName,
    password,
  }: LoginCustomerDto): Promise<AuthCustomerResponse> {
    try {
      const hashedPassword = await this.authService.hashPassword(password);

      const id = uuid();
      await this.customerRepository.insert({
        id,
        userName,
        password: hashedPassword,
      });

      const authToken = await this.authService.signAuthToken({ id, userName });

      return { id, userName, authToken };
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async listBooks(): Promise<Book[]> {
    try {
      const books = await this.bookRepository.find();
      return books;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async getBookByParam(param: string, value: string): Promise<Nullable<Book>> {
    try {
      const book = await this.bookRepository.findOneBy({ [param]: value });
      return book;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async getBookReviews(book: Partial<Book>): Promise<Review[]> {
    try {
      const reviews = await this.reviewRepository.find({ where: { book } });
      return reviews;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
