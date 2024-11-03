import { Router } from 'express';
import { create, get, list } from '../controllers/book.controller';
import { validateRequest } from '../middleware/validate';
import { CreateDto } from '../dtos/create.dto';

const router = Router();

router.get('/', list);
router.get('/:id', get);
router.post('/', validateRequest(CreateDto), create);

export default router;
