import { IsNull, Not } from 'typeorm';
import { BorrowRecord } from '../entities/borrowRecord.entity';
import { Rating } from '../entities/rating.entity';
import { User } from '../entities/user.entity';
import { AppDataSource } from '../data-source';
import { Book } from '../entities/book.entity';

export const createUser = (name: string): Promise<{ data?: User, status: boolean }> => {
  return new Promise((response, reject) => {
    try {
      const userRepository = AppDataSource.getRepository(User);
      const user = userRepository.create({ name });
      userRepository.save(user).then(user => response({ data: user, status: true }))
        .catch(rej => response({ data: rej?.toString(), status: false }));
    }
    catch (error) {
      reject(error);
    }
  });
};

export const listUsers = (): Promise<{ data?: User[], status: boolean }> => {
  return new Promise((response, reject) => {
    try {
      const userRepository = AppDataSource.getRepository(User);
      userRepository.find().then(users => response({ data: users, status: true }))
        .catch(rej => response({ data: rej?.toString(), status: false }));
    }
    catch (error) {
      reject(error);
    }
  });
};

export const getUser = (id: number): Promise<{ data?: { id: number, name: string, books: unknown }, status: boolean }> => {
  return new Promise((response, reject) => {
    try {
      const userRepository = AppDataSource.getRepository(User);
      const borrowRepository = AppDataSource.getRepository(BorrowRecord);
      const ratingRepository = AppDataSource.getRepository(Rating);
  
      userRepository.findOne({ where: { id: id } }).then(async user => {
        if (!user) return response({ status: false });
    
        const pastBorrows = await borrowRepository.find({
          where: { user: { id: user.id }, returnDate: Not(IsNull()) },
          relations: ['book'],
        });
    
        const currentBorrows = await borrowRepository.find({
          where: { user: { id: user.id }, returnDate: IsNull() },
          relations: ['book'],
        });
    
        const userRatings = await ratingRepository.find({
          where: { user: { id: user.id } },
          relations: ['borrowRecord'],
        });
                
        const res = {
          id: user.id,
          name: user.name,
          books: {
            past: pastBorrows.map(borrow => ({
              name: borrow.book.name,
              userScore: userRatings.find(r => r.borrowRecord.id === borrow.id)?.userScore || null,
            })),
            present: currentBorrows.map(borrow => ({ name: borrow.book.name })),
          },
        };
        response({ data: res, status: true });
      });
    }
    catch (error) {
      reject(error);
    }
  });
};

export const borrowOrReturn = (id: number, bookId: number, type: 'borrow' | 'return', score?: number): Promise<{ data?: unknown, status: boolean }> => {
  return new Promise((response, reject) => {
    try {
      const userRepository = AppDataSource.getRepository(User);
      const borrowRepository = AppDataSource.getRepository(BorrowRecord);
      const bookRepository = AppDataSource.getRepository(Book);
      const ratingRepository = AppDataSource.getRepository(Rating);
  
      userRepository.findOne({ where: { id: id } }).then(async user => {
        if (!user) return response({ status: false });
        const book = await bookRepository.findOne({ where: { id: bookId } });
        if (!book) return response({ status: false });

        if(type === 'borrow') {
          // Check if the book is already borrowed and not returned
          const existingBorrow = await borrowRepository.findOne({
            where: { book: { id: book.id }, returnDate: IsNull() },
          });
          
          if (existingBorrow) {
            return response({ data: 'Book is already borrowed', status: false });
          }
  
          const borrowRecord = borrowRepository.create({ user, book });
          await borrowRepository.save(borrowRecord);
          return response({ status: true });
        }
        
        // Find the active borrow record
        const borrowRecord = await borrowRepository.findOne({
          where: { user: { id: user.id }, book: { id: book.id }, returnDate: IsNull() },
        });

        if (!borrowRecord) {
          return response({ data: 'No active borrow record found', status: false });
        }

        // Update return date
        borrowRecord.returnDate = new Date();
        
        const ratingEntity = ratingRepository.create({ user, book, borrowRecord, userScore: score });
        const rating = await ratingRepository.save(ratingEntity);
        await borrowRepository.save({ ...borrowRecord, rating: rating });
        
        return response({ status: true });        
        
      });
    }
    catch (error) {
      reject(error);
    }
  });
};