import { Order } from "../../domain/entity/order";
import { OrderItem } from "../../domain/entity/order-item";
import { IOrderRepository } from "../../domain/repository";
import { OrderItemModel } from "../db/sequelize/models/order-items.model";
import { OrderModel } from "../db/sequelize/models/order.model";

export class OrderRepository implements IOrderRepository {
  async create({ id, customerId, items, total }: Order): Promise<void> {
    await OrderModel.create({
      id,
      total,
      customer_id: customerId,
      items: items.map(item => ({
        id: item.id,
        price: item.price,
        quantity: item.quantity,
        product_id: item.productId
      }))
    }, { include: [{model: OrderItemModel}] })
  }

  async update({id, total, items, customerId}: Order): Promise<void> {
    await OrderModel.update({
      total,
      customerId,
      items: items.map(item => ({
        id: item.id,
        price: item.price,
        quantity: item.quantity,
        product_id: item.productId
      }))
    }, { where: { id } })
  }

  async findOne(id: string): Promise<Order> {
    try {
      const { customer_id, total, items} = await OrderModel.findOne({ where: { id }, include: [{model: OrderItemModel}], rejectOnEmpty: true });
      const orderItems = items.map(item => new OrderItem(item.id, item.product_id, item.price, item.quantity));
      const order = new Order(id, customer_id, orderItems);

      return order;
    } catch {
      throw new Error('Order not found')
    }
  }

  async findAll(): Promise<Order[]> {
    const ordersFromDb = await OrderModel.findAll({include: [{model: OrderItemModel}]});
    return ordersFromDb.map(({id, customer_id, items}) => {
      const orderItems = items.map(item => new OrderItem(item.id, item.product_id, item.price, item.quantity));
      const order = new Order(id, customer_id, orderItems);
      return order;
    })
  }

}