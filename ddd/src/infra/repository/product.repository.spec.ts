import { Sequelize } from 'sequelize-typescript'
import { ProductModel } from '../db/sequelize/models/product.model';
import { Product } from '../../domain/entity/product';
import { ProductRepository } from './product.repository';
describe('ProductRepository', () => {
  let sequelize: Sequelize;
  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true }
    });

    sequelize.addModels([ProductModel])
    await sequelize.sync()

  })
  afterEach(async () => {
    await sequelize.close();
  })

  it("should create a product", async () => {
    const productRepository = new ProductRepository();
    const product = new Product("any_id", "any_product", 12.5);
    
    await productRepository.create(product);

    const productModel = await ProductModel.findOne({ where: { id: "any_id" } })

    expect(productModel.toJSON()).toStrictEqual({
      id: "any_id",
      name: "any_product",
      price: 12.5
    })
  })

  it("should find a product by id", async () => {
    const productRepository = new ProductRepository();
    const product = new Product("any_id", "any_product", 12.5);
    await productRepository.create(product);

    const createdProduct = await productRepository.findOne(product.id);

    expect(createdProduct).toStrictEqual(product)
  })

  it("should find all products", async () => {
    const productRepository = new ProductRepository();
    const product1 = new Product("any_id1", "any_product1", 12.5);
    await productRepository.create(product1);
    const product2 = new Product("any_id2", "any_product2", 10.5);
    await productRepository.create(product2);

    const createdProducts = await productRepository.findAll();

    expect([product1, product2]).toEqual(createdProducts)
  })

  it("should update a product", async () => {
    const productRepository = new ProductRepository();
    const product = new Product("any_id", "any_product", 12.5);
    await productRepository.create(product);

    product.changePrice(10.5);
    await productRepository.update(product);

    const productModel = await ProductModel.findOne({ where: { id: "any_id" } })

    expect(productModel.toJSON()).toStrictEqual({
      id: "any_id",
      name: "any_product",
      price: 10.5
    })
  })
  
})