import { Address } from "./address";

export class Customer {
  private _id: string;
  private _name: string;
  private _address?: Address;
  private _active: boolean = false;

  constructor(id: string, name: string) {
    this._id = id;
    this._name = name;
    this.validate();    
  }

  private validate(): void {
    if (!this._name) {
      throw new Error('Name is required');
    }
    if (!this._id) {
      throw new Error('ID is required');
    }
  }

  public changeName(name: string): void {
    this._name = name;
    this.validate();
  }

  public activate(): void {
    if (!this._address) throw new Error('Address is mandatory for activation');

    this._active = true;
  }

  public deactivate(): void {
    this._active = false;
  }

  set address(address: Address) {
    this._address = address;
  }

  get name(): string {
    return this._name;
  }

  get isActive(): boolean {
    return this._active;
  }

}