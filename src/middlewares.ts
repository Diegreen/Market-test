
import { Request, Response, NextFunction } from 'express';
import { market } from './database';


export function checkDuplicateName(req: Request, res: Response, next: NextFunction) {
  const { name } = req.body;
  const productExists = market.some((product) => product.name === name);
  if (productExists) {
    return res.status(409).json({ message: 'Product already registered.' });
  }
  next();
}


export function checkProductId(req: Request, res: Response, next: NextFunction) {
  const productId = parseInt(req.params.id);
  const productExists = market.some((product) => product.id === productId);
  if (productExists) {
    return res.status(404).json({ message: 'Product not found.' });
  }
  next();
}