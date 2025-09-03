import { Entity, Column, PrimaryColumn, ManyToOne } from 'typeorm';
import { Customer } from '../customer/customer.entity';
import { Book } from './book.entity';

@Entity('review')
export class Review {
  @PrimaryColumn({ type: 'uuid', unique: true })
  id: number;

  @Column({ nullable: false })
  review: string;

  @ManyToOne(() => Customer, (customer: Customer) => customer.reviews, {
    onDelete: 'CASCADE',
    eager: true,
  })
  customer: Customer;

  @ManyToOne(() => Book, (book: Book) => book.reviews, {
    onDelete: 'CASCADE',
    eager: true,
  })
  book: Book;
}
