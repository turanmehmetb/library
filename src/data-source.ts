import { User } from './entities/user.entity';
import { Book } from './entities/book.entity';
import { BorrowRecord } from './entities/borrowRecord.entity';
import { Rating } from './entities/rating.entity';
import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '123456',
  database: 'library_db',
  synchronize: true,
  logging: false,
  entities: [User, Book, BorrowRecord, Rating],
});