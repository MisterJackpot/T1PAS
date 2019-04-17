import {DefaultCrudRepository, HasManyRepositoryFactory, repository, HasOneRepositoryFactory} from '@loopback/repository';
import {Order, Customer, Product} from '../models';
import {DbDataSource} from '../datasources';
import {Getter, inject} from '@loopback/core';
import {CustomerRepository} from './customer.repository';
import {ProductRepository} from './product.repository';

export class OrderRepository extends DefaultCrudRepository<
  Order,
  typeof Order.prototype.id
> {
  public readonly products: HasManyRepositoryFactory<
    Product,
    typeof Order.prototype.id
  >;
  public readonly costumer: HasOneRepositoryFactory<
    Customer,
    typeof Order.prototype.id
  >;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
    @repository.getter(CustomerRepository)
    protected customerRepositoryGetter: Getter<CustomerRepository>,
    @repository.getter(ProductRepository)
    protected productRepositoryGetter: Getter<ProductRepository>,
  ) {
    super(Order, dataSource);
    this.costumer = this.createHasOneRepositoryFactoryFor(
      'customer',
      customerRepositoryGetter,
    );
    this.products = this.createHasManyRepositoryFactoryFor(
      'products',
      productRepositoryGetter,
    );
  }
}
