import type { Response } from 'express';
import { Body, Controller, Get, Param, Post, Res } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { LoginCustomerDto } from '../customer/dto/customer.dto';
import { Customer } from '../customer/customer.entity';
import { BookService } from './book.service';
import {
  Book,
  BookResponse,
  BooksByAuthorResponse,
  BooksByTitleResponse,
} from './book.entity';
import { Review } from './review.entity';
import { Nullable } from '../types';

@Controller()
export class BookController {
  constructor(
    private readonly authService: AuthService,
    private readonly bookService: BookService,
  ) {}

  @Get('/')
  async listBooks(): Promise<BookResponse> {
    const books = await this.bookService.listBooks();
    return {
      books: books.reduce((acc, curr, index) => {
        acc[++index] = curr;
        return acc;
      }, {}),
    };
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
    const [bookByISBN] = await this.bookService.getBookByParam('isbn', isbn);
    return bookByISBN;
  }

  @Get('author/:author')
  async getBooksByAuthor(
    @Param('author') author: string,
  ): Promise<BooksByAuthorResponse> {
    const booksByAuthor = await this.bookService.getBookByParam(
      'author',
      author,
    );
    return {
      booksByAuthor,
    };
  }

  @Get('title/:title')
  async getBooksByTitle(
    @Param('title') title: string,
  ): Promise<BooksByTitleResponse> {
    const booksByTitle = await this.bookService.getBookByParam('title', title);
    return {
      booksByTitle,
    };
  }

  @Get('review/:id')
  async getBookReviewById(@Param('id') id: string): Promise<Nullable<Review>> {
    return await this.bookService.getBookReviewById(id);
  }

  @Get('reviews/:isbn')
  async getBookReviews(@Param('isbn') isbn: string): Promise<Review[]> {
    return await this.bookService.getBookReviews({ isbn });
  }
}
