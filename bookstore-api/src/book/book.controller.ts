import type { Response } from 'express';
import { Body, Controller, Get, Param, Post, Res } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { LoginCustomerDto } from '../customer/customer.dto';
import { Customer } from '../customer/customer.entity';
import { BookService } from './book.service';
import { Book } from './book.entity';
import { Review } from './review.entity';
import { Nullable } from '../types';

@Controller()
export class BookController {
  constructor(
    private readonly authService: AuthService,
    private readonly bookService: BookService,
  ) {}

  @Get('/')
  async listBooks(): Promise<Book[]> {
    return await this.bookService.listBooks();
  }

  @Post('register')
  async register(
    @Body() dto: LoginCustomerDto,
    @Res() res: Response,
  ): Promise<Response<Pick<Customer, 'id' | 'userName'>>> {
    const { id, userName, authToken } = await this.bookService.register(dto);

    this.authService.setCookie(authToken, res);
    return res.send({ id, userName });
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
