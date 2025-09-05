import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { BookController } from './book.controller';
import { BookService } from './book.service';
import { Book } from './book.entity';
import { Review } from './review.entity';
import { Customer } from '../customer/customer.entity';
import { ACCESS_TOKEN_EXPIRATION_TIME } from '../config';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        return {
          global: true,
          secret: configService.get<string>('ACCESS_TOKEN_SECRET'),
          signOptions: { expiresIn: `${ACCESS_TOKEN_EXPIRATION_TIME}m` },
        };
      },
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([Book, Review, Customer]),
  ],
  controllers: [BookController],
  providers: [BookService],
})
export class BookModule {}
