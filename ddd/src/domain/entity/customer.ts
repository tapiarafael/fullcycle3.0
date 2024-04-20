import { Address } from "./address";

export class Customer {
  private _id: string;
  private _name: string;
  private _address?: Address;
  private _active: boolean = false;
  private _rewardPoints: number = 0;

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

  get address(): Address {
    return this._address;
  }

  set address(address: Address) {
    this._address = address;
  }

  get id(): string {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get isActive(): boolean {
    return this._active;
  }

  addRewardPoints(points: number): void {
    this._rewardPoints += points;
  }

  get rewardPoints(): number {
    return this._rewardPoints;
  }

}