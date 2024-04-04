import { Address } from "./address";
import { Customer } from "./customer";

describe('Customer', () => {
  it("should throw an error when id is empty", () => {
    expect(() => new Customer("", "John Doe")).toThrow("ID is required");
  });

  it("should throw an error when name is empty", () => {
    expect(() => new Customer("1", "")).toThrow("Name is required");
  });

  it("should throw an error when changing name to an empty one", () => {
    const customer = new Customer("1", "John Doe");
    expect(() => customer.changeName("")).toThrow("Name is required");
  });

  it("should be able to change a customer name", () => {
    const customer = new Customer("1", "John Doe");

    customer.changeName("Jane Doe");

    expect(customer.name).toBe("Jane Doe");
  });

  it("should throw an error when activating a customer that has no address", () => {
    const customer = new Customer("1", "John Doe");
    expect(() => customer.activate()).toThrow("Address is mandatory for activation");
  });

  it("should be able to activate a customer", () => {
    const customer = new Customer("1", "John Doe");
    const address = new Address("123", "Main St", "12345", "Springfield");

    customer.address = address;
    customer.activate()

    expect(customer.isActive).toBe(true);
  });

  it("should be able to deactivate a customer", () => {
    const customer = new Customer("1", "John Doe");
    customer.deactivate()

    expect(customer.isActive).toBe(false);
  });

});