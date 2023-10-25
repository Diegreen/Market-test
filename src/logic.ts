
import { market } from "./database";
import { Product } from "./interfaces";

let currentProductId = 1;


function generateProductId(): number {
  return currentProductId++;
}

export function calculateExpirationDate(): Date {
  const expirationDate = new Date();
  expirationDate.setDate(expirationDate.getDate() + 365); 
  return expirationDate;
}


export function createProduct(productData: Omit<Product, 'id'>): Product {
    const id = generateProductId(); 
    const expirationDate = calculateExpirationDate();
  
    const product: Product = {
      id,
      name: productData.name,
      price: productData.price,
      weight: productData.weight,
      section: productData.section,
      calories: productData.calories,
      expirationDate,
    };
  
    market.push(product);
    return product;
  }

export function getAllProducts(): Product[] {
  return market;
}


export function getProductById(id: number): Product | undefined {
    return market.find((product) => product.id === id);
  }
  

  export function updateProduct(id: number, updatedProductData: Partial<Product>): Product | undefined {
    const productIndex = market.findIndex((product) => product.id === id);
  
    if (productIndex === -1) {
      return undefined; 
    }
  
    market[productIndex] = {
      ...market[productIndex],
      ...updatedProductData,
    };
  
    return market[productIndex];
  }


  export function deleteProduct(productId: number): boolean {
    const productIndex = market.findIndex((product) => product.id === productId);
    if (productIndex !== -1) {
      market.splice(productIndex, 1); 
      return true; 
    }
    return false; 
  }