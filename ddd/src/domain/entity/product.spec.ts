import { Product } from "./product";

describe("Product", () => {
  it("should throw an error when id is empty", () => {
    expect(() => new Product("", "MockProduct", 100)).toThrow("ID is required");
  });
  
  it("should throw an error when name is empty", () => {
    expect(() => new Product("1", "", 100)).toThrow("Name is required");
  });

  it("should throw an error when price is negative", () => {
    expect(() => new Product("1", "MockProduct", -1)).toThrow("Price must be a positive number");
  });

  it("should throw an error when changing name to an empty one", () => {
    const product = new Product("1", "MockProduct", 100);
    expect(() => product.changeName("")).toThrow("Name is required");
  });

  it("should be able to change product name", () => {
    const product = new Product("1", "MockProduct", 100);
    product.changeName("NewMockProduct");

    expect(product.name).toBe("NewMockProduct");
  });

  it("should throw an error when changing price to an invalid one", () => {
    const product = new Product("1", "MockProduct", 100);
    expect(() => product.changePrice(-100)).toThrow("Price must be a positive number");
  });

  it("should be able to change product price", () => {
    const product = new Product("1", "MockProduct", 100);
    product.changePrice(200);

    expect(product.price).toBe(200);
  });

});