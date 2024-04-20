import { Sequelize } from 'sequelize-typescript'
import { CustomerModel } from "../db/sequelize/models/customer.model";
import { CustomerRepository } from './customer.repository';
import { Customer } from '../../domain/entity/customer';
import { Address } from '../../domain/entity/address';

describe('CustomerRepository', () => {
  let sequelize: Sequelize;
  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true }
    });

    sequelize.addModels([CustomerModel])
    await sequelize.sync()

  })
  afterEach(async () => {
    await sequelize.close();
  })

  it('should create a customer', async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("any_id", "any_name");
    customer.address = new Address('any_street', 'any_number', 'any_zip', 'any_city');
    customer.activate();
    
    await customerRepository.create(customer);

    const customerModel = await CustomerModel.findOne({ where: { id: "any_id" } })

    expect(customerModel.toJSON()).toStrictEqual({
      id: "any_id",
      name: "any_name",
      active: true,
      rewardPoints: 0,
      street: 'any_street',
      number: 'any_number',
      zipcode: 'any_zip',
      city: 'any_city'
    })
  })

  it('should update a customer', async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("any_id", "any_name");
    customer.address = new Address('any_street', 'any_number', 'any_zip', 'any_city');
    customer.activate();
    
    await customerRepository.create(customer);
    
    customer.addRewardPoints(200);
    customer.deactivate();

    await customerRepository.update(customer);

    const customerModel = await CustomerModel.findOne({ where: { id: "any_id" } })

    expect(customerModel.toJSON()).toStrictEqual({
      id: "any_id",
      name: "any_name",
      active: false,
      rewardPoints: 200,
      street: 'any_street',
      number: 'any_number',
      zipcode: 'any_zip',
      city: 'any_city'
    })
  })

  it('should find a customer by id', async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("any_id", "any_name");
    customer.address = new Address('any_street', 'any_number', 'any_zip', 'any_city');
    customer.activate();
    customerRepository.create(customer);
    
    const createdCustomer = await customerRepository.findOne(customer.id);

    expect(createdCustomer).toStrictEqual(customer)
  })

  it('should throw if customer does not exists', async () => {
    const customerRepository = new CustomerRepository();
    const createdCustomer = customerRepository.findOne('any_id');

    await (expect(createdCustomer).rejects.toThrow('Customer not found'));
  })

  it('should return all customers', async() => {
    const customerRepository = new CustomerRepository();
    const customer1 = new Customer("any_id1", "any_name1");
    customer1.address = new Address('any_street1', 'any_number1', 'any_zip1', 'any_city1');
    customer1.activate();
    const customer2 = new Customer("any_id2", "any_name2");
    customer2.address = new Address('any_street2', 'any_number2', 'any_zip2', 'any_city2');
    customerRepository.create(customer1);
    customerRepository.create(customer2);

    const customers = await customerRepository.findAll();

    expect(customers).toHaveLength(2);
    expect(customers).toContainEqual(customer1);
    expect(customers).toContainEqual(customer2);
  });
})