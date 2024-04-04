import { Order } from "./order";
import { OrderItem } from "./order-item";

const mockOrderItems = [  new OrderItem("1", "123", 1, 10) ]

describe("Order", () => {
  it("should throw an error when id is empty", () => {
    expect(() => new Order("", "1", mockOrderItems)).toThrow("ID is required");
  });
  
  it("should throw an error when customer id is empty", () => {
    expect(() => new Order("1", "", mockOrderItems)).toThrow("CustomerId is required");
  });

  it("should throw an error when items empty", () => {
    expect(() => new Order("1", "1", [])).toThrow("At least one item is required");
  });

  it("should return the order total", () => {
    const order = new Order("1", "1", mockOrderItems);

    expect(order.total).toBe(10);
  });

});