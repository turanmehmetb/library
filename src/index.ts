import 'reflect-metadata';
import express from 'express';
import { AppDataSource } from './data-source';
import bookRoutes from './routes/book.routes';
import userRoutes from './routes/user.routes';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Register routes
app.use('/users', userRoutes);
app.use('/books', bookRoutes);

AppDataSource.initialize()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch(error => console.log('TypeORM connection error: ', error));
