import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from './book.entity';
import { Nullable } from '../types';
import { Review } from './review.entity';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(Book) private readonly bookRepository: Repository<Book>,
    @InjectRepository(Review)
    private readonly reviewRepository: Repository<Review>,
  ) {}

  async listBooks(): Promise<Book[]> {
    return await this.bookRepository.find();
  }

  async getBookByParam(param: string, value: string): Promise<Nullable<Book>> {
    return await this.bookRepository.findOneBy({ [param]: value });
  }

  async getBookReviews(book: Partial<Book>): Promise<Review[]> {
    return await this.reviewRepository.find({ where: { book } });
  }
}
