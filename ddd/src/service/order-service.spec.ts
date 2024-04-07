import { Customer } from "../entity/customer";
import { Order } from "../entity/order";
import { OrderItem } from "../entity/order-item";
import { OrderService } from "./order-service";

const orderItemsMock = [
  new OrderItem('1', 'Product 1', 100, 1),
  new OrderItem('2', 'Product 2', 200, 2),
];

describe("Order Service", () => {
  it("should get total amount of all orders", () => {
    const orders = [
      new Order('1', 'Customer 1', orderItemsMock),
      new Order('2', 'Customer 2', orderItemsMock),
    ];

    const total = OrderService.getTotalAmount(orders);
    
    expect(total).toBe(1000);
  });

  it("should create an order an give customer reward points", () => {
    const customer = new Customer('1', 'Customer 1');
    const order = OrderService.placeOrder(customer, orderItemsMock);

    expect(customer.rewardPoints).toBe(5);
    expect(order.total).toBe(500);
  })
})