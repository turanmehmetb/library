import { Request, Response } from 'express';
import { borrowOrReturn, createUser, getUser, listUsers } from '../services/user.service';

export const create = (req: Request, res: Response) => {
  const { name } = req.body;
  createUser(name)
    .then(response => response?.status ? res.json(response.data) : res.status(500).json({}))
    .catch(rej => res.status(500).json({ message: rej?.toString() }));
};

export const list = async (req: Request, res: Response) => {
  listUsers()
    .then(response => response?.status ? res.json(response.data) : res.status(500).json({}))
    .catch(rej => res.status(500).json({ message: rej?.toString() }));
};

export const get = async (req: Request, res: Response) => {
  const id = req.params?.id;
  if(!id) {
    res.status(400).json({ message: 'Missing or wrong parameters' });
    return;
  }
  getUser(Number(id))
    .then(response => response?.status ? res.json(response.data) : res.status(404).json({ message: 'User not found' }))
    .catch(rej => res.status(500).json({ message: rej?.toString() }));
};

export const execute = async (req: Request, res: Response) => {
  const id = req.params?.id;
  const bookId = req.params?.bookId;
  const type = req.params?.type;
  const score = req.body?.score;
  if(!id || !bookId || !(type === 'borrow' || type === 'return')) {
    res.status(400).json({ message: 'Missing or wrong parameters' });
    return;
  }
  borrowOrReturn(Number(id), Number(bookId), type, score)
    .then(response => response?.status ? res.status(204).json({}) : res.status(400).json({ message: response?.data }))
    .catch(rej => res.status(500).json({ message: rej?.toString() }));
};
