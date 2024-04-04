export class OrderItem {
  private _id: string;
  private _name: string;
  private _quantity: number;
  private _price: number;

  constructor(id: string, name: string, quantity: number, price: number) {
    this._id = id;
    this._name = name;
    this._quantity = quantity;
    this._price = price;
  }

  public total(): number {
    return this._quantity * this._price;
  }
}