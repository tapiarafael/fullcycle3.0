import { Customer } from "../entity/customer";
import { RepositoryInterface } from "./repository.interface";

export interface ICustomerRepository extends RepositoryInterface<Customer> { 
}