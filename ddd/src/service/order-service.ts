import { Customer } from "../entity/customer";
import { Order } from "../entity/order";
import { OrderItem } from "../entity/order-item";

export class OrderService {
  
  static getTotalAmount(orders: Order[]): number {
    return orders.reduce((total, order) => {
      return total + order.total;
    }, 0);
  }

  static placeOrder(customer: Customer, orderItems: OrderItem[]): Order {
    const order = new Order(new Date().getTime().toString(), customer.id, orderItems);

    customer.addRewardPoints(order.total / 100);

    return order;
  }
}