import { Request, Response, NextFunction } from 'express';
import { validate } from 'class-validator';
import { ClassConstructor, plainToInstance } from 'class-transformer';

export const validateRequest = <T>(dtoClass: ClassConstructor<T>)  => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { type } = req.params; // only for book borrow

    // Skip validation if type is 'borrow'
    if (type === 'borrow') {
      return next();
    }

    const dto = plainToInstance(dtoClass, req.body);
    validate(dto as object).then(errors => {
      if (errors.length > 0) {
        const messages = errors.map(error => Object.values(error.constraints!)).join(', ');
        res.status(400).json({ message: messages });
      } 
      else {
        next();
      }
    });
  };
};
