import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, OneToOne, JoinColumn } from 'typeorm';
import { User } from './user.entity';
import { Book } from './book.entity';
import { BorrowRecord } from './borrowRecord.entity';

@Entity()
export class Rating {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  userScore!: number;

  @CreateDateColumn()
  createdAt!: Date;

  @ManyToOne(() => User, user => user.ratings, { eager: true })
  user!: User;

  @ManyToOne(() => Book, book => book.ratings, { eager: true })
  book!: Book;

  @OneToOne(() => BorrowRecord, borrowRecord => borrowRecord.rating)
  @JoinColumn()
  borrowRecord!: BorrowRecord;
}
