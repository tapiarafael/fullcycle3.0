import { Product } from "../entity/product";
import { RepositoryInterface } from "./repository.interface";

export interface IProductRepository extends RepositoryInterface<Product> { 
}