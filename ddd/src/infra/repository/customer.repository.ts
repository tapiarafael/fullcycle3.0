import { Address } from "../../domain/entity/address";
import { Customer } from "../../domain/entity/customer";
import { ICustomerRepository } from "../../domain/repository";
import { CustomerModel } from "../db/sequelize/models/customer.model";

export class CustomerRepository implements ICustomerRepository {
  async create({id, name, address, rewardPoints, isActive}: Customer): Promise<void> {
    await CustomerModel.create({
      id,
      name,
      rewardPoints,
      active: isActive,
      street: address.street,
      number: address.number,
      city: address.city,
      zipcode: address.zip
    })
  }

  async update({id, name, address, rewardPoints, isActive}: Customer): Promise<void> {
    await CustomerModel.update(
      {
        id,
        name,
        rewardPoints,
        active: isActive,
        street: address.street,
        number: address.number,
        city: address.city,
        zipcode: address.zip
      },
      {
        where: { id }
      }
    )
  }
  async findOne(id: string): Promise<Customer> {
    try {
      const { name, rewardPoints, active, street, number, zipcode, city} = await CustomerModel.findOne({ where: { id }, rejectOnEmpty: true })
      const customer = new Customer(id, name);
      const address = new Address(street, number, zipcode, city);
      customer.address = address;
      customer.addRewardPoints(rewardPoints);
      active ? customer.activate() : customer.deactivate();
  
      return customer;
    } catch {
      throw new Error('Customer not found');
    }
  }

  async findAll(): Promise<Customer[]> {
    const customers = await CustomerModel.findAll();
    return customers.map(({id, name, active, rewardPoints, street, number, zipcode, city}) => {
      const customer = new Customer(id, name);
      const address = new Address(street, number, zipcode, city);
      customer.address = address;
      customer.addRewardPoints(rewardPoints);
      active ? customer.activate() : customer.deactivate();
  
      return customer;
    })
  }

}