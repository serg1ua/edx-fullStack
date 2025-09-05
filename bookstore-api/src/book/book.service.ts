import * as bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Customer } from '../customer/customer.entity';
import { Book } from './book.entity';
import { Review } from './review.entity';
import { SALT_ROUNDS } from '../config';
import { AuthCustomerResponse } from '../customer/customer.dto';
import { Nullable } from '../types';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(Book) private readonly bookRepository: Repository<Book>,
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,
    @InjectRepository(Review)
    private readonly reviewRepository: Repository<Review>,
    private jwtService: JwtService,
  ) {}

  async register({ userName, password }): Promise<AuthCustomerResponse> {
    try {
      const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

      const id = uuid();
      await this.customerRepository.insert({
        id,
        userName,
        password: hashedPassword,
      });

      const authToken = await this.jwtService.signAsync({ id, userName });

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
