export class OrderItem {
  private _id: string;
  private _productId: string;
  private _price: number;
  private _quantity: number;

  constructor(id: string, productId: string, price: number, quantity: number) {
    this._id = id;
    this._productId = productId;
    this._price = price;
    this._quantity = quantity;
  }

  get total(): number {
    return this._quantity * this._price;
  }
}