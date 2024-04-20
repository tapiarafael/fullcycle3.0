import { Order } from "../entity/order";
import { RepositoryInterface } from "./repository.interface";

export interface IOrderRepository extends RepositoryInterface<Order> {} 