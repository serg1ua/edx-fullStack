import { Controller, Get, Param, Post } from '@nestjs/common';
import { BookService } from './book.service';
import { Book } from './book.entity';
import { Review } from './review.entity';
import { Nullable } from '../types';

@Controller()
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Get('/')
  async listBooks(): Promise<Book[]> {
    return await this.bookService.listBooks();
  }

  @Post('register')
  register() {
    // Register user
  }

  @Get('isbn/:isbn')
  async getBookByISBN(@Param('isbn') isbn: string): Promise<Nullable<Book>> {
    return await this.bookService.getBookByParam('isbn', isbn);
  }

  @Get('author/:author')
  async getBooksByAuthor(
    @Param('author') author: string,
  ): Promise<Nullable<Book>> {
    return await this.bookService.getBookByParam('author', author);
  }

  @Get('title/:title')
  async getBooksByTitle(
    @Param('title') title: string,
  ): Promise<Nullable<Book>> {
    return await this.bookService.getBookByParam('title', title);
  }

  @Get('review/:isbn')
  async getBookReviews(@Param('isbn') isbn: string): Promise<Review[]> {
    return await this.bookService.getBookReviews({ isbn });
  }
}
