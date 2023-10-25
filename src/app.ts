import express from 'express';
import { Request, Response } from 'express';
import { Product } from './interfaces';
import { market } from './database';
import {checkDuplicateName, checkProductId} from './middlewares';
import { createProduct, getAllProducts, getProductById, updateProduct, deleteProduct } from './logic';

const app = express();
const port = 3000;

app.use(express.json());


app.use(checkDuplicateName);

app.use(checkProductId);

app.post('/products', (req: Request, res: Response) => {
  const newProduct = req.body as Product;
  const product = createProduct(newProduct);
  res.status(201).json(product);
});


app.get('/products', (req: Request, res: Response) => {
  const products = getAllProducts();
  const total = products.reduce((sum, product) => sum + product.price, 0);
  res.status(200).json({ total, products });
});


app.get('/products/:id', (req: Request, res: Response) => {
  const productId = parseInt(req.params.id);
  const product = getProductById(productId);
  if (product) {
    res.status(200).json(product);
  } else {
    res.status(404).json({ message: 'Product not found.' });
  }
});


app.patch('/products/:id', (req: Request, res: Response) => {
  const productId = parseInt(req.params.id);
  const updatedProduct = req.body as Partial<Product>;
  const product = updateProduct(productId, updatedProduct);
  if (product) {
    res.status(200).json(product);
  } else {
    res.status(404).json({ message: 'Product not found.' });
  }
});


app.delete('/products/:id', (req: Request, res: Response) => {
    const productId = parseInt(req.params.id);
    const productIndex = market.findIndex((product) => product.id === productId);
  
    if (productIndex !== -1) {
      market.splice(productIndex, 1); 
      res.sendStatus(204); 
    } else {
      res.status(404).json({ message: 'Product not found.' }); 
    }
  });

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});