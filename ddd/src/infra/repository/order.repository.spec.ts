import { Sequelize } from "sequelize-typescript";
import { Address } from "../../domain/entity/address";
import { Customer } from "../../domain/entity/customer";
import { Order } from "../../domain/entity/order";
import { OrderItem } from "../../domain/entity/order-item";
import { Product } from "../../domain/entity/product";
import { CustomerModel } from "../db/sequelize/models/customer.model";
import { OrderItemModel } from "../db/sequelize/models/order-items.model";
import { OrderModel } from "../db/sequelize/models/order.model";
import { ProductModel } from "../db/sequelize/models/product.model";
import { CustomerRepository } from "./customer.repository";
import { OrderRepository } from "./order.repository";
import { ProductRepository } from "./product.repository";

describe("Order repository test", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    sequelize.addModels([
      CustomerModel,
      OrderModel,
      OrderItemModel,
      ProductModel,
    ]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  async function createProduct(): Promise<Product> {
    const productRepository = new ProductRepository();
    const product = new Product("123", "Product 1", 10);

    await productRepository.create(product);

    return product;
  }

  async function createCustomer(): Promise<Customer> {
    const customerRepository = new CustomerRepository();
    const customer = new Customer(Date.now().toString(), "Customer 1");
    const address = new Address("Street 1", "1", "Zipcode 1", "City 1");
    customer.address = address;
    customer.activate();

    await customerRepository.create(customer);

    return customer;
  }

  function createOrderItem(productId: string): OrderItem {
    return new OrderItem(Date.now().toString(), productId, 10, 1)
  }

  it("should create an order", async () => {
    const orderRepository = new OrderRepository();

    const customer = await createCustomer();
    const product = await createProduct();

    const orderItem = createOrderItem(product.id)
    const orderItems = [orderItem]
    const order = new Order("1", customer.id, orderItems);

    await orderRepository.create(order);

    const orderModel = await OrderModel.findOne({
      where: { id: order.id },
      include: ["items"],
    });

    expect(orderModel.toJSON()).toStrictEqual({
      id: "1",
      customer_id: customer.id,
      total: order.total,
      items: [
        {
          id: orderItem.id,
          price: orderItem.price,
          quantity: orderItem.quantity,
          product_id: orderItem.productId,
          order_id: "1",
        },
      ],
    });
  });

  it("should update an order", async () => {
    const orderRepository = new OrderRepository();

    const customer = await createCustomer();
    const product = await createProduct();

    const orderItem = createOrderItem(product.id)
    const orderItems = [orderItem]
    const order = new Order("1", customer.id, orderItems);
    
    await orderRepository.create(order);

    const differentCustomer = await createCustomer();
    order.changeCustomer(differentCustomer.id);

    await orderRepository.update(order);

    const orderModel = await OrderModel.findOne({
      where: { id: order.id },
      include: ["items"],
    });

    expect(orderModel.toJSON()).toStrictEqual({
      id: "1",
      customer_id: customer.id,
      total: order.total,
      items: [
        {
          id: orderItem.id,
          price: orderItem.price,
          quantity: orderItem.quantity,
          product_id: orderItem.productId,
          order_id: "1",
        },
      ],
    });
  });

  it("should be able to update item quantity from an order", async () => {
    const orderRepository = new OrderRepository();

    const customer = await createCustomer();
    const product = await createProduct();

    const orderItem = createOrderItem(product.id)
    const orderItems = [orderItem]
    const order = new Order("1", customer.id, orderItems);
    
    await orderRepository.create(order);

    orderItem.changeQuantity(5);

    await orderRepository.update(order);

    const orderModel = await OrderModel.findOne({
      where: { id: order.id },
      include: ["items"],
    });

    expect(orderModel.toJSON()).toStrictEqual({
      id: "1",
      customer_id: customer.id,
      total: order.total,
      items: [
        {
          id: orderItem.id,
          price: orderItem.price,
          quantity: orderItem.quantity,
          product_id: orderItem.productId,
          order_id: "1",
        },
      ],
    });
  });

  it("should find an order by id", async () => {
    const orderRepository = new OrderRepository();

    const customer = await createCustomer();
    const product = await createProduct();

    const orderItem = createOrderItem(product.id)
    const order = new Order("1", customer.id, [orderItem]);
    await orderRepository.create(order);

    const orderDb = await orderRepository.findOne(order.id);

    expect(orderDb).toStrictEqual(order);
  });

  it("should find all orders", async () => {
    const orderRepository = new OrderRepository();

    const customer = await createCustomer();
    const product = await createProduct();

    const orderItem = createOrderItem(product.id)
    const order = new Order("1", customer.id, [orderItem]);
    await orderRepository.create(order);

    const orderItem2 = createOrderItem(product.id)
    const differentCustomer = await createCustomer();
    const order2 = new Order("2", differentCustomer.id, [orderItem2]);
    await orderRepository.create(order2);

    const orders = await orderRepository.findAll();

    expect(orders).toHaveLength(2);
    expect(orders).toContainEqual(order);
    expect(orders).toContainEqual(order2);
  });

  it('should throw if order does not exists', async () => {
    const orderRepository = new OrderRepository();
    const order = orderRepository.findOne('any_id');

    await (expect(order).rejects.toThrow('Order not found'));
  })

});
