import { OrderItem } from "./order-item";

export class Order {
  private _id: string;
  private _customerId: string;
  private _items: OrderItem[];

  constructor(id: string, customerId: string, items: OrderItem[]) {
    this._id = id;
    this._customerId = customerId;
    this._items = items;
  }

  public total(): number {
    return this._items.reduce((total, item) => total + item.total(), 0);
  }
}