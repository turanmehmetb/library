import { Request, Response } from 'express';
import { createBook, getBook, listBooks } from '../services/book.service';

export const create = (req: Request, res: Response) => {
  const { name } = req.body;
  createBook(name)
    .then(response => response?.status ? res.json(response.data) : res.status(500).json({}))
    .catch(rej => res.status(500).json({ message: rej?.toString() }));
};

export const list = async (req: Request, res: Response) => {
  listBooks()
    .then(response => response?.status ? res.json(response.data) : res.status(500).json({}))
    .catch(rej => res.status(500).json({ message: rej?.toString() }));
};

export const get = async (req: Request, res: Response) => {
  const id = req.params?.id;
  if(!id) {
    res.status(400).json({ message: 'Missing or wrong parameters' });
    return;
  }
  getBook(Number(id))
    .then(response => response?.status ? res.json(response.data) : res.status(404).json({ message: 'Book not found' }))
    .catch(rej => res.status(500).json({ message: rej?.toString() }));
  
};

