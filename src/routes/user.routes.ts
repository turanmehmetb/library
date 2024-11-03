import { Router } from 'express';
import { execute, create, get, list } from '../controllers/user.controller';
import { CreateDto } from '../dtos/create.dto';
import { validateRequest } from '../middleware/validate';
import { ReturnBookDto } from '../dtos/returnBook.dto';

const router = Router();

router.get('/', list);
router.get('/:id', get);
router.post('/', validateRequest(CreateDto), create);
router.post('/:id/:type/:bookId', validateRequest(ReturnBookDto), execute);

export default router;
