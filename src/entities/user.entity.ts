import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn } from 'typeorm';
import { BorrowRecord } from './borrowRecord.entity';
import { Rating } from './rating.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @OneToMany(() => BorrowRecord, borrowRecord => borrowRecord.user)
  borrowRecords!: BorrowRecord[];

  @OneToMany(() => Rating, rating => rating.user)
  ratings!: Rating[];
}
