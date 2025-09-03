import { Controller, Get, Post } from '@nestjs/common';
import { BookService } from './book.service';
import { Book } from './book.entity';

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
  getBookByISBN() {
    // Get book details based on ISBN
  }

  @Get('author/:author')
  getBooksByAuthor() {
    // Get book details based on author
  }

  @Get('title/:title')
  getBooksByTitle() {
    // Get book details based on author
  }

  @Get('review/:isbn')
  getBookReviews() {
    // Get book details based on author
  }
}
