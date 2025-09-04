import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookController } from './book.controller';
import { BookService } from './book.service';
import { Book } from './book.entity';
import { Review } from './review.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Book, Review])],
  controllers: [BookController],
  providers: [BookService],
})
export class BookModule {}
