import { Book } from '../entities/book.entity';
import { Rating } from '../entities/rating.entity';
import { AppDataSource } from '../data-source';
import NodeCache from 'node-cache';

const bookInfoCache = new NodeCache({ stdTTL: 300 }); // Cache for 5 minutes

export const createBook = (name: string): Promise<{ data?: Book, status: boolean }> => {
  return new Promise((response, reject) => {
    try {
      const bookRepository = AppDataSource.getRepository(Book);
      const book = bookRepository.create({ name });
      bookRepository.save(book).then(user => response({ data: user, status: true }))
        .catch(rej => response({ data: rej?.toString(), status: false }));
    }
    catch (error) {
      reject(error);
    }
  });
};

export const listBooks = (): Promise<{ data?: Book[], status: boolean }> => {
  return new Promise((response, reject) => {
    try {
      const bookRepository = AppDataSource.getRepository(Book);
      bookRepository.find().then(books => response({ data: books, status: true }))
        .catch(rej => response({ data: rej?.toString(), status: false }));
    }
    catch (error) {
      reject(error);
    }
  });
};

export const getBook = (id: number):  Promise<{ data?: { name: string, score?: number }, status: boolean }> => {
  return new Promise((response, reject) => {
    try {
      const cachedData = bookInfoCache.get(id) as { name: string, score?: number }; // check cache first
      if (cachedData) {
        return response({ data: cachedData, status: true });
      }

      const bookRepository = AppDataSource.getRepository(Book);
      const ratingRepository = AppDataSource.getRepository(Rating);

      bookRepository.findOne({ where: { id: id } }).then(async book => {
        if (!book) return response({ status: false });
    
        const ratings = await ratingRepository.find({ where: { book: { id: book.id } } });
        const averageRating =
          ratings.length > 0
            ? ratings.reduce((sum, r) => sum + r.userScore, 0) / ratings.length
            : null;
    
        const res = {
          id: book.id,
          name: book.name,
          score: averageRating ?? -1,
        };

        response({ data: res, status: true });
        bookInfoCache.set(id, res); // set cache
      });
    }
    catch (error) {
      reject(error);
    }
  });
};