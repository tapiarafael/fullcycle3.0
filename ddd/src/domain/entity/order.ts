import { OrderItem } from "./order-item";

export class Order {
  private _id: string;
  private _customerId: string;
  private _items: OrderItem[];

  constructor(id: string, customerId: string, items: OrderItem[]) {
    this._id = id;
    this._customerId = customerId;
    this._items = items;
    this.validate();
  }

  private validate(): void {
    if (!this._id) {
      throw new Error('ID is required');
    }

    if (!this._customerId) {
      throw new Error('CustomerId is required');
    }

    if (!this._items || this._items.length === 0) {
      throw new Error('At least one item is required');
    }
  }

  changeCustomer(customerId: string): void {
    this._customerId = customerId;
  }

  get total(): number {
    return this._items.reduce((total, item) => total + item.total, 0);
  }

  get id(): string {
    return this._id;
  }

  get customerId(): string {
    return this._customerId;
  }

  get items(): OrderItem[] {
    return this._items;
  }
}