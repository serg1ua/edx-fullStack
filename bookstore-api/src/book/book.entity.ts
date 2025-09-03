import { Entity, Column, PrimaryColumn, OneToMany } from 'typeorm';
import { Review } from './review.entity';

@Entity('book')
export class Book {
  @PrimaryColumn({ type: 'uuid', unique: true })
  id: number;

  @Column({ nullable: false })
  author: string;

  @Column({ nullable: false })
  title: string;

  @OneToMany(() => Review, (review: Review) => review.book, {
    onDelete: 'CASCADE',
    eager: true,
  })
  reviews: Review[];
}
