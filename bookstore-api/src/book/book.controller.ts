import { Controller, Get, Post } from '@nestjs/common';
import { BookService } from './book.service';

@Controller()
export class BookController {
  constructor(private readonly bookService: BookService) {}
  @Post('register')
  register() {
    // Register user
  }

  @Get('')
  listBooks() {
    // Get the book list available in the shop
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
