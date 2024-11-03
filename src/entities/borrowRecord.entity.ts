import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Book } from './book.entity';
import { User } from './user.entity';
import { Rating } from './rating.entity';

@Entity()
export class BorrowRecord {
  @PrimaryGeneratedColumn()
  id!: number;

  @CreateDateColumn()
  borrowDate!: Date;

  @Column({ nullable: true })
  returnDate!: Date;

  @ManyToOne(() => User, user => user.borrowRecords, { eager: true })
  user!: User;

  @ManyToOne(() => Book, book => book.borrowRecords, { eager: true })
  book!: Book;

  @OneToOne(() => Rating, rating => rating.borrowRecord) // incase of same user borrows and rates the same book again
  @JoinColumn()
  rating!: Rating;
}
