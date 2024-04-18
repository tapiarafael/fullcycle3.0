export class Address {
  private _street: string;
  private _number: string;
  private _zip: string;
  private _city: string;

  constructor(street: string, number: string, zip: string, city: string) {
    this._street = street;
    this._number = number;
    this._zip = zip;
    this._city = city;

    this.validate();
  }

  private validate(): void {
    if (!this._street) {
      throw new Error('Street is required');
    }
    if (!this._number) {
      throw new Error('Number is required');
    }
    if (!this._zip) {
      throw new Error('Zip is required');
    }
    if (!this._city) {
      throw new Error('City is required');
    }
  }

  public toString(): string {
    return `${this._street} ${this._number}, ${this._zip} ${this._city}`;
  }


}