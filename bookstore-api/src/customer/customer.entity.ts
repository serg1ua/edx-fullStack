import { Entity, Column, PrimaryColumn, OneToMany } from 'typeorm';
import { Review } from '../book/review.entity';

@Entity('customer')
export class Customer {
  @PrimaryColumn({ type: 'uuid', unique: true })
  id: number;

  @Column({ unique: true, nullable: false })
  userName: string;

  @Column({ nullable: false })
  password: string;

  @OneToMany(() => Review, (review: Review) => review.customer, {
    onDelete: 'CASCADE',
    eager: true,
  })
  reviews: Review[];
}
