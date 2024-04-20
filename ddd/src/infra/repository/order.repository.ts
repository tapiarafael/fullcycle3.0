import { Order } from "../../domain/entity/order";
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

  async update(entity: Order): Promise<void> {
    throw new Error("Method not implemented.");
  }

  async findOne(id: string): Promise<Order> {
    throw new Error("Method not implemented.");
  }

  async findAll(): Promise<Order[]> {
    throw new Error("Method not implemented.");
  }

}