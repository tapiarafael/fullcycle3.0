import { Product } from "../../domain/entity/product";
import { IProductRepository } from "../../domain/repository";
import { ProductModel } from "../db/sequelize/models/product.model";

export class ProductRepository implements IProductRepository {
  async create(entity: Product): Promise<void> {
    await ProductModel.create({
      id: entity.id,
      name: entity.name,
      price: entity.price
    });
  }
  async update({ id, name, price }: Product): Promise<void> {
    await ProductModel.update({
      id,
      name,
      price
    }, {
      where: { id }
    })
  }
  async findOne(id: string): Promise<Product> {
    const product = await ProductModel.findOne({ where: { id } });

    return new Product(product.id, product.name, product.price)
  }
  
  async findAll(): Promise<Product[]> {
    const products = await ProductModel.findAll();

    return products.map(({ id, name, price }) => new Product(id, name, price))
  }

}