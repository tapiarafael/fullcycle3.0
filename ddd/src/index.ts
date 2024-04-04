import { Address } from "./entity/address";
import { Customer } from "./entity/customer";
import { Order } from "./entity/order";
import { OrderItem } from "./entity/order-item";

const customer = new Customer('1', 'John Doe');
const address = new Address('Main St.', '100', '12345', 'Springfield');
customer.address = address;
customer.activate();

const laptopItem = new OrderItem('1', 'Laptop', 1, 1500);
const mouseItem = new OrderItem('2', 'Mouse', 1, 25);
const orderItems = [laptopItem, mouseItem];
const order = new Order('1', '1', orderItems);
