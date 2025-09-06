import { Entity, Column, PrimaryColumn, ManyToOne } from 'typeorm';
import { Customer } from '../customer/customer.entity';
import { Book } from './book.entity';

@Entity('review')
export class Review {
  @PrimaryColumn({ type: 'uuid', unique: true })
  id: string;

  @Column({ nullable: false })
  review: string;

  @ManyToOne(() => Customer, (customer: Customer) => customer.reviews)
  customer: Customer;

  @ManyToOne(() => Book, (book: Book) => book.reviews)
  book: Book;
}
