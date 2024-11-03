import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn } from 'typeorm';
import { BorrowRecord } from './borrowRecord.entity';
import { Rating } from './rating.entity';

@Entity()
export class Book {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @OneToMany(() => BorrowRecord, borrowRecord => borrowRecord.book)
  borrowRecords!: BorrowRecord[];

  @OneToMany(() => Rating, rating => rating.book)
  ratings!: Rating[];
}
