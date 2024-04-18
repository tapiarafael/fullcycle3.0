import { Product } from "../entity/product";

export class ProductService {

  static increasePrices(products: Product[], percent: number): void {
    products.forEach(product => {
      const newPrice = product.price + (product.price * percent / 100);
      product.changePrice(newPrice);
    });
  }
}