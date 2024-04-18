import { Product } from "../entity/product";
import { ProductService } from "./product-service";

describe("Product Service", () => {
  it("should increase the price of all products by a percent", () => {
    const products = [
      new Product("1", "Product 1", 10),
      new Product("2", "Product 2", 20),
    ];

    ProductService.increasePrices(products, 10);

    expect(products[0].price).toBe(11);
    expect(products[1].price).toBe(22);
  });
})